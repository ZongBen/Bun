export class LoginCommand {
     readonly account: string;
     readonly password: string;

    constructor(account: string, password: string) {
        this.account = account;
        this.password = password;
    }
}