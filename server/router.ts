import { Router, Response, Request, NextFunction } from "express";
import { IFormRepository } from "./db";

export interface IAppResponseLocals {
    services: {
        formRepository: IFormRepository;
    };
}

export const createFormRouter = () => {
    const formRouter = Router();

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

    return formRouter;
}
