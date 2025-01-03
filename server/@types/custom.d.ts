import { Request, Application } from "express";
import { IFormRepository } from "../db";
import { MongoClient } from "mongodb";

declare global {
    namespace Express {
        interface AppLocals {
            mongoClient: MongoClient;
        }
        interface IServiceCollection {
            formRepository: IFormRepository
        }

        interface Request extends Request  {
            services: IServiceCollection
        }

        interface Application extends Application<AppLocals> {}
    }

    namespace NodeJS {
        interface ProcessEnv extends NodeJS.ProcessEnv {
            mongodb: string 
        }
    }
}