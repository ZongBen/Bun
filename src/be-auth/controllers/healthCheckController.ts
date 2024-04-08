import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../../be-common/controller/baseController";

export class HealthCheckController extends BaseController {
    public apiPath: string = "/health-check";

    private async healthCheck(req: Request, res: Response, next: NextFunction) {
        res.send("OK");
        next();
    }

    public mapRoutes() {
        this.router.get("/", this.healthCheck);
        return this.router;
    }
}