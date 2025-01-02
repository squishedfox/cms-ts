import { Request, Response, NextFunction } from "express";
import { AppRequest } from "./types";

export const servicesMiddleware = (
  req: AppRequest,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export const errorMiddeleware = (
  req: AppRequest,
  res: Response,
  next: NextFunction,
) => {
  next();
};

export default [servicesMiddleware, errorMiddeleware];
