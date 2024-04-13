import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../../commonLib/controllerLib/baseController";
import type { LoginReq } from "../contract/auth/login/loginReq";
import { LoginCommand } from "../applicationLayer/useCase/command/login/loginCommand";
import { inject } from "inversify";
import type { IMediator } from "../../commonLib/mediatorLib/interfaces/IMediator";
import { MEDIATOR_TYPES } from "../../commonLib/mediatorLib/types";
import { loginRule } from "../contract/auth/login/loginRule";
import type { RegisterReq } from "../contract/auth/register/registerReq";
import { RegisterCommand } from "../applicationLayer/useCase/command/register/registerCommand";
import { registerRule } from "../contract/auth/register/registerRule";

export class AuthController extends BaseController {
    apiPath: string = "/auth";

    constructor(
        @inject(MEDIATOR_TYPES.IMediator) private readonly _mediator: IMediator
    ) {
        super();
    }

    private async login(req: Request<any, any, LoginReq>, res: Response, next: NextFunction) {
        const command = new LoginCommand(req.body.account, req.body.password);
        const result = await this._mediator.send<any>(command);
        this.resvoleResponse(result, res, next);
    }

    private error(_req: Request, _res: Response, _next: NextFunction) {
        throw new Error("test");
    }

    private async register(req: Request<any, any, RegisterReq>, res: Response, next: NextFunction) {
        const command = new RegisterCommand(req.body.account, req.body.password, req.body.userName);
        const result = await this._mediator.send<any>(command);
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