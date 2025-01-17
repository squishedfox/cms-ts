import { Request, Response, NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { FormRepository } from './db';

class ServicesCollection {
  private readonly services: Map<string, object | Function>;
  constructor() {
    this.services = new Map();
  }

  addService(key: string, instanceOrFunction: object | Function): typeof this {
    this.services.set(key, instanceOrFunction);
    return this;
  }

  getService<T>(key: string): T | null {
    const serviceOrFunc = this.services.get(key);
    if (serviceOrFunc === undefined || serviceOrFunc === null) {
      return null;
    }
    if (typeof serviceOrFunc === 'function') {
      return serviceOrFunc();
    }
    if (typeof serviceOrFunc === 'object') {
      return serviceOrFunc as T;
    }

    throw new Error(`Could find service for ${key}`);
  }
}

export const serviceCollectionMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  req.services = new ServicesCollection();
  next();
};

export const servicesMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const { mongoClient } = req.app.locals;
  const session = mongoClient.startSession();
  try {
    req.services.addService(
      FormRepository.constructor.name,
      new FormRepository(mongoClient),
    );
    next();
  } catch (err: unknown) {
    next(err);
  } finally {
    await session.endSession();
  }
};

export default [serviceCollectionMiddleware, servicesMiddleware];
