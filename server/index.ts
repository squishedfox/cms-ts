import express, { Request, Response } from "express";
import middlewares from "./middleware";
import { AppRequest } from "./types";
import { IFormRepository } from "./db";

type SearchFormsRequest = AppRequest<
  unknown, // path parameters
  unknown, // response body type
  unknown, // request body type
  { formId?: string; formName?: string }, // query parameters
  { formRepository: IFormRepository }
>;

(function () {
  const app = express();

  app.use(...middlewares);

  app.get("/forms", (req: SearchFormsRequest, resp) => {
    const { formId, formName } = req.query;
    const { formRepository } = req;

    resp.status(200).json({});
  });

  app.post("/forms", (req, resp) => {
    // TODO: Call mongodb and create forms
    resp.status(201).json({});
  });

  app.put("/forms/{id}", (req, resp) => {
    // TODO: update forms
    resp.status(200).json({});
  });

  app.get("/forms/{id}", (req, resp) => {
    // TODO: get form from mongo db based on ID
    resp.status(200).json({});
  });

  app.listen("0.0.0.0:8080", () => {
    console.log("Listening on port 0.0.0.0:8080");
  });
})();
