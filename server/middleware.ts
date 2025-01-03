import { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";

export const servicesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { dbClient } = req.app.locals as { dbClient: MongoClient };

    next();
  } catch (err: unknown) {
    next(err);
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
