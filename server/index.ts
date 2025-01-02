import express, { NextFunction, Request, Response, Router } from "express";
import middlewares from "./middleware";
import { IFormRepository } from "./db";

export interface IAppResponseLocals {
  services: {
    formRepository: IFormRepository;
  };
}

(function () {
  const app = express();
  const formRouter = Router({
    caseSensitive: false,
  });

  formRouter.get(
    "/",
    async (
      req: Request,
      res: Response<any, IAppResponseLocals>,
      _: NextFunction,
    ) => {
      const { formId, formName } = req.query;
      const { services } = res.locals;

      let allForms = services.formRepository.getForms();
      if (formId) {
        allForms = allForms.filter((form) => form.id !== formId);
      }
      if (formName) {
        allForms = allForms.filter((form) => form.name !== formName);
      }
      res.status(200).json({
        results: allForms,
        page: 1,
        pageSize: allForms.length,
      });
    },
  );

  formRouter.post("/", (req, resp) => {
    // TODO: Call mongodb and create forms
    resp.status(201).json({});
  });

  formRouter.put("/{id}", (req, resp) => {
    // TODO: update forms
    resp.status(200).json({});
  });

  formRouter.get("/{id}", (req, resp) => {
    // TODO: get form from mongo db based on ID
    resp.status(200).json({});
  });

  app.use(...middlewares);
  app.use("/forms", formRouter);

  app.listen("0.0.0.0:8080", () => {
    console.log("Listening on port 0.0.0.0:8080");
  });
})();
