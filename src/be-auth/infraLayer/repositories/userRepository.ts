import { inject, injectable } from "inversify";
import type { IMongoClient } from "../../../be-common/mongoLib/interfaces/IMongoClient";
import type { IUserRepository } from "../../applicationLayer/persistences/IUserRepository";
import { UserEntity } from "../../domainLayer/user/userEntity";
import { ModelCodes } from '../collections/modelCodes';
import type { User } from "../collections/user";
import { MONGO_TYPES } from "../../../be-common/mongoLib/types";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject(MONGO_TYPES.IMongoClient) private readonly _mongoClient: IMongoClient,
    ) {

    }

    async getUserByAccount(account: string): Promise<UserEntity | null> {
        const user = await this._mongoClient.getModel<User>(ModelCodes.USER).findOne({ Account: account });
        if (!user) {
            return null;
        }
        return UserEntity.Create(user.Account, user.Password, user.UserName);
    }
}