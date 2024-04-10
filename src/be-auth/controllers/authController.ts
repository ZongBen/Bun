import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../../be-common/controller/baseController";
import type { LoginReq } from "../contract/auth/loginReq";
import { LoginCommand } from "../applicationLayer/userCase/command/login/loginCommand";
import { inject } from "inversify";
import type { IMediator } from "../../be-common/mediatorLib/interfaces/IMediator";
import { MEDIATOR_TYPES } from "../../be-common/mediatorLib/types";

export class AuthController extends BaseController {
    public apiPath: string = "/auth";

    constructor(
        @inject(MEDIATOR_TYPES.IMediator) private _mediator: IMediator
    ) { 
        super();
    }

    private async login(req: Request<any, any, LoginReq>, res: Response, next: NextFunction) {
        const command = new LoginCommand(req.body.account, req.body.password, req.body.username);
        const result = await this._mediator.send<string>(command);
        res.send(result);
        next();
    }

    private error(_req: Request, _res: Response, _next: NextFunction) {
        throw new Error("test");
    }

    public mapRoutes() {
        console.log('wow')
        this.router.post("/login", this.bindAction(this, this.login));
        this.router.get("/error", this.bindAction(this, this.error));
        return this.router;
    }
}