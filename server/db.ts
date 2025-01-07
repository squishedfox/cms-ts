import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Form } from './models';

export type CreateFormModel = Omit<Form, 'id'>;
export interface IFormRepository {
  addForm(model: CreateFormModel): Promise<string>;
  getForm(id: string): Promise<Form | null>;
  getForms(): Promise<Array<Form>>;
  deleteForm(id: string): Promise<boolean>;
  updateForm(form: Form): Promise<void>;
}

export class FormRepository implements IFormRepository {
  constructor(private readonly client: MongoClient) {}

  private get collection(): Collection<Form> {
    return this.client.db('formbuilder').collection<Form>('forms');
  }

  async deleteForm(id: string): Promise<boolean> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      const deleteResult = await this.collection.findOneAndDelete(
        {
          _id: ObjectId.createFromHexString(id),
        },
        {
          session,
        },
      );
      await session.commitTransaction();
      return deleteResult !== undefined;
    } catch (err: unknown) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async updateForm(form: Form): Promise<void> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      await this.collection.findOneAndUpdate(
        { _id: ObjectId.createFromHexString(form.id) },
        form,
        {
          session,
        },
      );
      await session.commitTransaction();
    } catch (err: unknown) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async addForm(model: CreateFormModel): Promise<string> {
    const session = this.client.startSession();
    try {
      session.startTransaction();
      const insertResult = await this.collection.insertOne(model as Form, {
        session,
      });
      await session.commitTransaction();
      if (insertResult.acknowledged) {
        return insertResult.insertedId.toHexString();
      }
    } catch (err: unknown) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }

    throw new Error(
      'Could not insert form. Database failed to acknowledged command',
    );
  }

  async getForms(): Promise<Array<Form>> {
    const session = this.client.startSession();
    try {
      const formsCursor = this.collection.find(
        {},
        {
          projection: {
            _id: 1,
            createdOn: 1,
            createdBy: 1,
            name: 1,
            fields: 1,
            updatedOn: 1,
            updatedBy: 1,
          },
        },
      );
      let forms: Form[] = [];
      for await (const form of formsCursor) {
        forms = [...forms, form];
      }
      return forms;
    } catch (err: unknown) {
      console.error(err);
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async getForm(id: string): Promise<Form | null> {
    const session = this.client.startSession();
    try {
      const form = await this.collection.findOne(
        { _id: ObjectId.createFromHexString(id) },
        {
          projection: {
            _id: 1,
            createdOn: 1,
            createdBy: 1,
            name: 1,
            fields: 1,
            updatedOn: 1,
            updatedBy: 1,
          },
        },
      );
      return form;
    } catch (err: unknown) {
      console.error(err);
      throw err;
    } finally {
      await session.endSession();
    }
  }
}
