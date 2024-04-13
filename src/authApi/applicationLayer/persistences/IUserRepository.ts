import type { IJwTokenHelper } from "../../../commonLib/jwTokenLib/interfaces/IJwTokenHelper";
import type { UserEntity } from "../../domainLayer/user/userEntity";

export interface IUserRepository {
    getUserByAccount(account: string): Promise<UserEntity | null>;
    createUser(userEnity: UserEntity): Promise<UserEntity>;
    getUserToken(userEntity: UserEntity, jwtHelper: IJwTokenHelper): string;
}