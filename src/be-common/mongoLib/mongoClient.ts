import mongoose, { Model } from "mongoose";
import type { IMongoSchema } from "./interfaces/IMongoSchema";
import type { IMongoClient } from "./interfaces/IMongoClient";
import { injectable } from "inversify";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";

@injectable()
export class MongoClient implements IMongoClient, IMongoInitializer {

    private readonly _db: mongoose.Connection;

    public constructor(connStr: string) {
        mongoose.connect(connStr);
        this._db = mongoose.connection;
    }
    
    public regisModel(schemas: IMongoSchema[]) {
        schemas.forEach((schema) => {
            this._db.model(schema.colName, schema.schema);
        });
    }

    public getModel<T>(colName: string): Model<T> {
        return this._db.model<T>(colName);
    }
}