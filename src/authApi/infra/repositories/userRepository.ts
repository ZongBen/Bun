import { inject, injectable } from "inversify";
import type { IMongoClient } from "../../../commonLib/mongoLib/interfaces/IMongoClient";
import type { IUserRepository } from "../../application/persistences/IUserRepository";
import { UserEntity } from "../../domain/user/userEntity";
import { User } from "../collections/user";
import { MONGO_TYPES } from "../../../commonLib/mongoLib/types";
import type { IJwTokenGenerator } from "../../../commonLib/jwTokenLib/interfaces/IJwTokenGenerator";
import { ColName } from "../collections/colName";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject(MONGO_TYPES.IMongoClient) private readonly _mongoClient: IMongoClient,
    ) {

    }

    async getUserByAccount(account: string): Promise<UserEntity | null> {
        const user = await this._mongoClient.getCol<User>(ColName.USER).findOne<User>({ account });
        if (!user) {
            return null;
        }
        return UserEntity.create(user.account, user.encryptedPwd, user.userName);
    }

    async createUser(userEnity: UserEntity): Promise<UserEntity> {
        const userCol = this._mongoClient.getCol<User>(ColName.USER);
        await userCol.create<User>(new User(
            userEnity.account,
            userEnity.encryptedPwd,
            userEnity.userName
        ))
        return userEnity;
    }

    getUserToken(userEntity: UserEntity, jwtGenerator: IJwTokenGenerator): string {
        return jwtGenerator.generateToken({
            account: userEntity.account,
            userName: userEntity.userName
        });
    }
}
