export class RegisterCommand {
    public readonly account: string;
    public readonly password: string;
    public readonly username: string;

    constructor(account: string, password: string, username: string) {
        this.account = account;
        this.password = password;
        this.username = username;
    }
}