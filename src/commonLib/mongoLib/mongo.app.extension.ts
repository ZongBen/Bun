import type { App } from "../bootstrapLib/app";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";
import type { IMongoSchema } from './interfaces/IMongoSchema';
import { MONGO_TYPES } from "./types";

export class MongoAppExtension {
   static regisSchemas(app: App, schemas: IMongoSchema[]) {
      app.serviceContainer.get<IMongoInitializer>(MONGO_TYPES.IMongoInitializer).regisModel(schemas);
   }
}
