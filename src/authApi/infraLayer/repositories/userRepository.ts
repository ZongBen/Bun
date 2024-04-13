import { inject, injectable } from "inversify";
import type { IMongoClient } from "../../../commonLib/mongoLib/interfaces/IMongoClient";
import type { IUserRepository } from "../../applicationLayer/persistences/IUserRepository";
import { UserEntity } from "../../domainLayer/user/userEntity";
import { ModelCodes } from '../collections/modelCodes';
import { User } from "../collections/user";
import { MONGO_TYPES } from "../../../commonLib/mongoLib/types";
import type { IJwTokenHelper } from "../../../commonLib/jwTokenLib/interfaces/IJwTokenHelper";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject(MONGO_TYPES.IMongoClient) private readonly _mongoClient: IMongoClient,
    ) {

    }

    async getUserByAccount(account: string): Promise<UserEntity | null> {
        const user = await this._mongoClient.getCol<User>(ModelCodes.USER).findOne<User>({ account });
        if (!user) {
            return null;
        }
        return UserEntity.Create(user.account, user.encryptedPwd, user.userName);
    }

    async createUser(userEnity: UserEntity): Promise<UserEntity> {
        const userCol = this._mongoClient.getCol<User>(ModelCodes.USER);
        await userCol.create<User>(new User(
            userEnity.account,
            userEnity.encryptedPwd,
            userEnity.userName
        ))
        return userEnity;
    }

    getUserToken(userEntity: UserEntity, jwtHelper: IJwTokenHelper): string {
        return jwtHelper.generateToken({ 
            account: userEntity.account,
            userName: userEntity.userName
        });
    }
}