export class RegisterResult {
    public readonly account!: string;
    public readonly username!: string;

    constructor(account: string, username: string) {
        this.account = account;
        this.username = username;
    }
}