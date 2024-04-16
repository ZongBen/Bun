import type { ErrorResponse } from "../../../../../commonLib/applicationLib/errorResponse";
import type { OkResponse } from "../../../../../commonLib/applicationLib/okResponse";
import type { IReq } from "../../../../../commonLib/mediatorLib/interfaces/IReq";

export class LoginCommand implements IReq<OkResponse|ErrorResponse> {
    readonly account: string;
    readonly password: string;

    constructor(account: string, password: string) {
        this.account = account;
        this.password = password;
    }
}