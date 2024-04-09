import type { IMongoClient } from "../../../be-common/mongoLib/interfaces/IMongoClient";
import type { IUserRepository } from "../../applicationLayer/persistences/IUserRepository";
import { UserRoot } from "../../domainLayer/user/userRoot";
import { ModelCodes } from '../collections/modelCodes';
import type { IUser } from "../collections/user";

export class UserRepository implements IUserRepository {

    private readonly _mongoClient: IMongoClient;

    constructor(mongoClient: IMongoClient) {
        this._mongoClient = mongoClient;
    }

    async getUserByAccount(account: string): Promise<UserRoot | null> {
        const user = await this._mongoClient.getModel<IUser>(ModelCodes.USER).findOne({ account });
        if (!user) {
            return null;
        }
        return UserRoot.Create(user.Account, user.Password, user.UserName);
    }
}