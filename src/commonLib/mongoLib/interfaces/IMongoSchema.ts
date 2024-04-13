import type { Schema } from "mongoose";

export interface IMongoSchema {
    colName: string;
    schema: Schema;
}