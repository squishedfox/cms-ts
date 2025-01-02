import { ClientSession } from "mongodb";
import { Form } from "./models";

export type CreateFormModel = Omit<Form, "id">;
export interface IFormRepository {
  addForm(model: CreateFormModel): Promise<string>;
  getForm(id: string): Promise<Form>;
  getForms(): Array<Form>;
  deleteForm(id: string): Promise<boolean>;
  updateForm(form: Form): Promise<void>;
}

export class FormRepository implements IFormRepository {
  constructor(private readonly session: ClientSession) {}
}
