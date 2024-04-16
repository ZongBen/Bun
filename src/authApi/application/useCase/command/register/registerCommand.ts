import { ErrorResponse } from "../../../../../commonLib/applicationLib/errorResponse";
import type { OkResponse } from "../../../../../commonLib/applicationLib/okResponse";
import type { IReq } from "../../../../../commonLib/mediatorLib/interfaces/IReq";

export class RegisterCommand implements IReq<OkResponse|ErrorResponse> {
    readonly account: string;
    readonly password: string;
    readonly userName: string;

    constructor(account: string, password: string, userName: string) {
        this.account = account;
        this.password = password;
        this.userName = userName;
    }
}