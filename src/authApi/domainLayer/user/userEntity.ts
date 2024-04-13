export class UserEntity {
     readonly account: string;
     readonly encryptedPwd: string;
     readonly userName: string;

    private constructor(account: string, encryptedPwd: string, userName: string) {
        this.account = account;
        this.encryptedPwd = encryptedPwd;
        this.userName = userName;
    }

     static Create(account: string, encryptedPwd: string, userName: string): UserEntity {
        return new UserEntity(account, encryptedPwd, userName);
    }

     ValidPassword(encryptedPwd: string): boolean {
        return this.encryptedPwd === encryptedPwd;
    }
}