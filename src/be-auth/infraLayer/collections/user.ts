import { Schema } from "mongoose";
import { ModelCodes } from "./modelCodes";
import type { IMongoSchema } from "../../../be-common/mongoLib/interfaces/IMongoSchema";

export interface IUser {
    Account: string;
    Password: string;
    Salt: string;
    UserName: string;
}

const userSchema = new Schema<IUser>(
    {
        Account: { type: String, required: true, unique: true },
        Password: { type: String, required: true },
        Salt: { type: String, required: true },
        UserName: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: ModelCodes.USER
    }
);

export class User implements IMongoSchema {
    public colName = ModelCodes.USER;
    public schema = userSchema;
}