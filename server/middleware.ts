import { Request, Response, NextFunction } from "express";

export const servicesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export const errorMiddeleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export default [servicesMiddleware, errorMiddeleware];
