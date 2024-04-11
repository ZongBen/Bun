import type { IMongoHelper } from "./interfaces/IMongoHelper";
import { MONGO_TYPES } from "./types";
import type { IMongoSchema } from './interfaces/IMongoSchema';
import type { Container } from "inversify";

export class MongoAppExtension {
    public static regisSchemas(container: Container, schemas: IMongoSchema[]) {
        container.get<IMongoHelper>(MONGO_TYPES.IMongoHelper).regisModel(schemas);
    }
}