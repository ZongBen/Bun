import { Schema } from "mongoose";
import { ModelCodes } from "./modelCodes";
import type { IMongoSchema } from "../../../commonLib/mongoLib/interfaces/IMongoSchema";

export class User {
    account: string = "";
    encryptedPwd: string = "";
    userName: string = "";

    constructor(account: string, encryptedPwd: string, userName: string) {
        this.account = account;
        this.encryptedPwd = encryptedPwd;
        this.userName = userName;
    }
}

const userSchema = new Schema<User>(
    {
        account: { type: String, required: true, unique: true },
        encryptedPwd: { type: String, required: true },
        userName: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
        collection: ModelCodes.USER
    }
);

export class UserSchema implements IMongoSchema {
    public colName = ModelCodes.USER;
    public schema = userSchema;
}