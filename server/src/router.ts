import { Router, Response, Request, NextFunction } from "express";

export const createFormRouter = () => {
    const formRouter = Router();

    formRouter.get(
        "/",
        async (
            req: Request,
            res: Response,
            _: NextFunction,
        ) => {
            const { formId, formName } = req.query;
            const { services } = req;

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

    formRouter.post("/", (req: Request, resp: Response) => {
        // TODO: Call mongodb and create forms
        resp.status(201).json({});
    });

    formRouter.put("/{id}", (req: Request, res: Response) => {
        // TODO: update forms
        res.status(200).json({});
    });

    formRouter.get("/{id}", async (req: Request<{id: string}>, res: Response) => {
        const {id} = req.params;
        // TODO: get form from mongo db based on ID
        const form = await req.services.formRepository.getForm(id)
        res.status(200).json(form);
    });

    return formRouter;
}
