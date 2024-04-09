import type { UserRoot } from "../../domainLayer/user/userRoot";

export interface IUserRepository {
    getUserByAccount(account: string): Promise<UserRoot | null>;
}