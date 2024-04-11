export class UserEntity {
    public readonly account: string;
    public readonly password: string;
    public readonly username: string;

    private constructor(account: string, password: string, username: string) {
        this.account = account;
        this.password = password;
        this.username = username;
    }

    public static Create(account: string, password: string, username: string): UserEntity {
        return new UserEntity(account, password, username);
    }
}