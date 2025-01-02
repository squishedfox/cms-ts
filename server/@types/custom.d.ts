import { Request } from "express";
import { IFormRepository } from "../db";

declare global {
    namespace Express {
        interface IServiceCollection {
            formRepository: IFormRepository
        }

        interface Request extends Request  {
            services: IServiceCollection
        }
    }
}