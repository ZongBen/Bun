import { Router } from "express"
import type { IBaseController } from "./interfaces/IBaseController";

export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    public abstract apiPath: string;
    public abstract mapRoutes(): Router;
}