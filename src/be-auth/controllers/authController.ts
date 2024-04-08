import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../../be-common/controller/baseController";
import type { LoginReq } from "../contract/auth/loginReq";

export class AuthController extends BaseController {
    public apiPath: string = "/auth";

    private async login(req: Request<any, any, LoginReq>, res: Response, next: NextFunction) {
        res.send("OK");
        console.log(req.body.username, req.body.password);
        next();
    }

    private error(req: Request, res: Response, next: NextFunction) {
        throw new Error("test");
    }

    public mapRoutes() {
        this.router.post("/login", this.login);
        this.router.get("/error", this.error);
        return this.router;
    }
}