import { Schema } from "mongoose";
import type { IMongoSchema } from "../../../commonLib/mongoLib/interfaces/IMongoSchema";
import { ColName } from "./colName";

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


export class UserSchema implements IMongoSchema {
    colName = ColName.USER;
    schema = new Schema<User>(
        {
            account: { type: String, required: true, unique: true },
            encryptedPwd: { type: String, required: true },
            userName: { type: String, required: true }
        },
        {
            timestamps: true,
            versionKey: false,
            collection: ColName.USER
        }
    );
}
