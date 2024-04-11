import { Router } from "express"
import type { IBaseController } from "./interfaces/IBaseController";
import { injectable } from "inversify";
import { validationResult } from "express-validator";

@injectable()
export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    public abstract apiPath: string;
    public abstract mapRoutes(): Router;

    public bindAction(instance: IBaseController, action: Function) {
        return action.bind(instance);
    }

    public useValidation(rule: any) {
        return [
            rule,
            (req: any, res: any, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                next();
            }
        ];
    }
}