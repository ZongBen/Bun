export class UserEntity {
    public readonly account: string;
    public readonly encryptedPwd: string;
    public readonly userName: string;

    private constructor(account: string, encryptedPwd: string, userName: string) {
        this.account = account;
        this.encryptedPwd = encryptedPwd;
        this.userName = userName;
    }

    public static Create(account: string, encryptedPwd: string, userName: string): UserEntity {
        return new UserEntity(account, encryptedPwd, userName);
    }
}