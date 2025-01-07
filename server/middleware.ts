import { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { FormRepository } from './db';

export const servicesMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { dbClient } = req.app.locals as { dbClient: MongoClient };
  const session = dbClient.startSession();

  try {
    req.services.formRepository = new FormRepository(session);
    next();
  } catch (err: unknown) {
    next(err);
  } finally {
    await session.endSession();
  }
};

export const errorMiddeleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export default [servicesMiddleware, errorMiddeleware];
