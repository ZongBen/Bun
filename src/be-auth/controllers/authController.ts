import { LoginCommandHandler } from './../applicationLayer/userCase/command/login/loginCommandHandler';
import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../../be-common/controller/baseController";
import type { LoginReq } from "../contract/auth/loginReq";
import { LoginCommand } from '../applicationLayer/userCase/command/login/loginCommand';

export class AuthController extends BaseController {
    public apiPath: string = "/auth";


    private readonly _loginCommandHandler: LoginCommandHandler;

    constructor(LoginCommandHandler: LoginCommandHandler) { 
        super();
        this._loginCommandHandler = LoginCommandHandler;
    }

    private async login(req: Request<any, any, LoginReq>, res: Response, next: NextFunction) {
        this._loginCommandHandler.handle(new LoginCommand(req.body.account, req.body.password, req.body.username));
        next();
    }

    private error(_req: Request, _res: Response, _next: NextFunction) {
        throw new Error("test");
    }

    public mapRoutes() {
        this.router.post("/login", this.login);
        this.router.get("/error", this.error);
        return this.router;
    }
}