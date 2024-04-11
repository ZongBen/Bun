import type { App } from "../bootstrapLib/app";
import type { IMongoHelper } from "./interfaces/IMongoHelper";
import { MONGO_TYPES } from "./types";
import type { IMongoSchema } from './interfaces/IMongoSchema';

export class MongoAppExtension {
    public static regisSchemas(app: App, schemas: IMongoSchema[]) {
        app.serviceContainer.get<IMongoHelper>(MONGO_TYPES.IMongoHelper).regisModel(schemas);
    }
}