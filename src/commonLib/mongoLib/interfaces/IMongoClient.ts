import type { Model } from "mongoose";

export interface IMongoClient {
    getCol<T>(colName: string): Model<T>;
}