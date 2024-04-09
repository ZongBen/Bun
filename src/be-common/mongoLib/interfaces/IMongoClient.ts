import type { Model } from "mongoose";

export interface IMongoClient {
    getModel<T>(colName: string): Model<T>;
}