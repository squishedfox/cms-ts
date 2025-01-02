import express, { Request } from "express";
import { IFormRepository } from "./db";

export type AppRequest<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
  Locals = unknown,
> = Request<
  Params,
  ResBody,
  ReqBody,
  ReqQuery,
  {
    formRepository: IFormRepository;
  } & Locals
>;
