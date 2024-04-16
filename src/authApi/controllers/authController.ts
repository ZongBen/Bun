import type { NextFunction, Request } from "express";
import { BaseController } from "../../commonLib/controllerLib/baseController";
import type { LoginReq } from "../contract/auth/login/loginReq";
import { LoginCommand } from "../application/useCase/command/login/loginCommand";
import { inject } from "inversify";
import { MEDIATOR_TYPES } from "../../commonLib/mediatorLib/types";
import { loginRule } from "../contract/auth/login/loginRule";
import type { RegisterReq } from "../contract/auth/register/registerReq";
import { RegisterCommand } from "../application/useCase/command/register/registerCommand";
import { registerRule } from "../contract/auth/register/registerRule";
import type { ISender } from "../../commonLib/mediatorLib/interfaces/ISender";
import type { IResponse } from "../../commonLib/controllerLib/response";
import { validErrorHandler } from "../../commonLib/controllerLib/handler/validErrorHandler";

export class AuthController extends BaseController {
    apiPath: string = "/auth";

    constructor(
        @inject(MEDIATOR_TYPES.ISender) private readonly _sender: ISender
    ) {
        super();
    }

    private async login(req: Request<any, any, LoginReq>, res: IResponse, next: NextFunction) {
        const command = new LoginCommand(req.body.account, req.body.password);
        const reuslt = await this._sender.send(command);
        res.locals.result = reuslt;
        next();
    }

    private error(_req: Request, _res: IResponse, _next: NextFunction) {
        throw new Error("test");
    }

    private async register(req: Request<any, any, RegisterReq>, res: IResponse, next: NextFunction) {
        const command = new RegisterCommand(req.body.account, req.body.password, req.body.userName);
        const result = await this._sender.send(command);
        res.locals.result = result;
        next();
    }

    private async logout(_req: Request, res: IResponse, next: NextFunction) {
        console.log(res.locals.jwtPayload)
        res.send("logout");
        next();
    }

    mapRoutes() {
        this.router.post("/login", this.useValidation(loginRule, validErrorHandler), this.bindAction(this, this.login));
        this.router.get("/error", this.bindAction(this, this.error));
        this.router.post("/register", this.useValidation(registerRule, validErrorHandler), this.bindAction(this, this.register));
        this.router.post("/logout", this.bindAction(this, this.logout));
        return this.router;
    }
}