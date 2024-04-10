import mongoose, { Model } from "mongoose";
import type { IMongoSchema } from "./interfaces/IMongoSchema";
import { inject, injectable } from "inversify";
import type { IMongoHelper } from "./interfaces/IMongoHelper";
import { MONGO_TYPES } from "./types";

@injectable()
export class MongoHelper implements IMongoHelper {

    private readonly _db: mongoose.Connection;

    public constructor(
        @inject(MONGO_TYPES.MongoConnectString) connStr: string
    ) {
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