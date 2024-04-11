import type { UserRoot } from "../../domainLayer/user/userEntity";

export interface IUserRepository {
    getUserByAccount(account: string): Promise<UserRoot | null>;
}