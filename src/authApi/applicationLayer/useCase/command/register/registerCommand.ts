export class RegisterCommand {
     readonly account: string;
     readonly password: string;
     readonly userName: string;

    constructor(account: string, password: string, userName: string) {
        this.account = account;
        this.password = password;
        this.userName = userName;
    }
}