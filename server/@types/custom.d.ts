import {
  Request as ExpressRequest,
  Application as ExpressApplication,
} from 'express';
import { IFormRepository } from '../db';
import { MongoClient } from 'mongodb';

declare global {
  namespace Express {
    interface AppLocals {
      mongoClient: MongoClient;
    }
    interface IServiceCollection {
      formRepository: IFormRepository;
    }

    interface Request extends ExpressRequest {
      services: IServiceCollection;
    }

    interface Application extends ExpressApplication {
      mongoClient: MongoClient;
    }
  }

  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
      mongodb: string;
    }
  }
}

