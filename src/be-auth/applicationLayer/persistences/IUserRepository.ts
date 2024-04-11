import type { UserEntity } from "../../domainLayer/user/userEntity";

export interface IUserRepository {
    getUserByAccount(account: string): Promise<UserEntity | null>;
}