export class RegisterResult {
    readonly account!: string;
    readonly username!: string;

    constructor(account: string, username: string) {
        this.account = account;
        this.username = username;
    }
}