import { inject, injectable } from "inversify";
import type { IMongoClient } from "../../../be-common/mongoLib/interfaces/IMongoClient";
import type { IUserRepository } from "../../applicationLayer/persistences/IUserRepository";
import { UserRoot } from "../../domainLayer/user/userRoot";
import { ModelCodes } from '../collections/modelCodes';
import type { IUser } from "../collections/user";
import { MONGO_TYPES } from "../../../be-common/mongoLib/types";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject(MONGO_TYPES.IMongoClient) private _mongoClient: IMongoClient,
    ) {

    }

    async getUserByAccount(account: string): Promise<UserRoot | null> {
        const user = await this._mongoClient.getModel<IUser>(ModelCodes.USER).findOne({ Account: account });
        if (!user) {
            return null;
        }
        return UserRoot.Create(user.Account, user.Password, user.UserName);
    }
}