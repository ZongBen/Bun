export class RegisterCommand {
    public readonly account: string;
    public readonly password: string;
    public readonly userName: string;

    constructor(account: string, password: string, userName: string) {
        this.account = account;
        this.password = password;
        this.userName = userName;
    }
}