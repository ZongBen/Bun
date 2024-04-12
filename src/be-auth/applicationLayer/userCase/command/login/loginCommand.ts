export class LoginCommand {
    public readonly account: string;
    public readonly password: string;

    constructor(account: string, password: string) {
        this.account = account;
        this.password = password;
    }
}