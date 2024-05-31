import { Model, Connection } from "mongoose";
import { inject, injectable } from "inversify";
import type { IMongoClient } from "./interfaces/IMongoClient";
import { MONGO_TYPES } from "./types";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";

@injectable()
export class MongoClient implements IMongoClient {

    private readonly _db: Connection;

    constructor(
        @inject(MONGO_TYPES.IMongoInitializer) mongoInitializer: IMongoInitializer
    ) {
        this._db = mongoInitializer.getDb();
    }

    getCol<T>(colName: string): Model<T> {
        return this._db.model<T>(colName);
    }
}
