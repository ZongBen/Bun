import type { NextFunction, Request, Response } from "express";
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

export class AuthController extends BaseController {
    apiPath: string = "/auth";

    constructor(
        @inject(MEDIATOR_TYPES.ISender) private readonly _sender: ISender
    ) {
        super();
    }

    private async login(req: Request<any, any, LoginReq>, res: Response, next: NextFunction) {
        const command = new LoginCommand(req.body.account, req.body.password);
        const result = await this._sender.send<any>(command);
        this.resvoleResponse(result, res, next);
    }

    private error(_req: Request, _res: Response, _next: NextFunction) {
        throw new Error("test");
    }

    private async register(req: Request<any, any, RegisterReq>, res: Response, next: NextFunction) {
        const command = new RegisterCommand(req.body.account, req.body.password, req.body.userName);
        const result = await this._sender.send<any>(command);
        this.resvoleResponse(result, res, next);
    }

    private async logout(_req: Request, res: Response, next: NextFunction) {
        console.log(res.locals['jwtPayload'])
        res.send("logout");
        next();
    }

    mapRoutes() {
        this.router.post("/login", this.useValidation(loginRule), this.bindAction(this, this.login));
        this.router.get("/error", this.bindAction(this, this.error));
        this.router.post("/register", this.useValidation(registerRule), this.bindAction(this, this.register));
        this.router.post("/logout", this.bindAction(this, this.logout));
        return this.router;
    }
}