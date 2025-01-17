import 'dotenv/config';
import express, { Application } from 'express';
import middlewares from './middleware';
import { createFormRouter } from './router';
import { MongoClient } from 'mongodb';
import invariant from 'tiny-invariant';

(async function () {
  let dbClient: MongoClient;

  invariant(
    process.env.MONGO_URL,
    'Failed to fetch MONGO_URL from environment variables',
  );
  const port = process.env.PORT || 3000;
  const host = process.env.HOST ?? '0.0.0.0';
  try {
    // this is not secure and should not be trusted but works for a prototype
    dbClient = new MongoClient(process.env.MONGO_URL);
    await dbClient.connect();
  } catch (err: unknown) {
    console.error('Failed to establish connection to mongo db server');
    throw err;
  }

  const app: Application = express();
  app.locals.mongoClient = dbClient;
  const formRouter = createFormRouter();

  app.use(...middlewares);
  app.use('/forms', formRouter);

  const server = app.listen(`${host}:${port}`, () => {
    console.log(`Listening at ${host}:${port}`);
  });
  server.on('close', () => {
    dbClient.close();
    delete app.locals.mongoClient;
  });
})()
  .then(console.log)
  .catch(console.error);
