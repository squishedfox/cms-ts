import { ClientSession } from 'mongodb'
import { Form } from './models'

export type CreateFormModel = Omit<Form, 'id'>
export interface IFormRepository {
  addForm(model: CreateFormModel): Promise<string>
  getForm(id: string): Promise<Form>
  getForms(): Array<Form>
  deleteForm(id: string): Promise<boolean>
  updateForm(form: Form): Promise<void>
}

export class FormRepository implements IFormRepository {
  constructor(private readonly session: ClientSession) {}

  deleteForm(id: string): Promise<boolean> {
    throw new Error('not implemented')
  }

  updateForm(form: Form): Promise<void> {
    throw new Error('not implemented')
  }

  addForm(model: CreateFormModel): Promise<string> {
    throw new Error('not implemented')
  }

  getForms(): Array<Form> {
    throw new Error('not implemented')
  }

  getForm(id: string): Promise<Form> {
    throw new Error('not implemented')
  }
}
