import type { IJwTokenGenerator } from "../../../commonLib/jwTokenLib/interfaces/IJwTokenGenerator";
import type { UserEntity } from "../../domain/user/userEntity";

export interface IUserRepository {
    getUserByAccount(account: string): Promise<UserEntity | null>;
    createUser(userEnity: UserEntity): Promise<UserEntity>;
    getUserToken(userEntity: UserEntity, jwtHelper: IJwTokenGenerator): string;
}