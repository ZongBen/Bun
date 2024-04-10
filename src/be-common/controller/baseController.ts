import { Router } from "express"
import type { IBaseController } from "./interfaces/IBaseController";
import { injectable } from "inversify";

@injectable()
export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    public abstract apiPath: string;
    public abstract mapRoutes(): Router;
    public bindAction(instance: IBaseController, action: Function) {
        return action.bind(instance);
    }
}