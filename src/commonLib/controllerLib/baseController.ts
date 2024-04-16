import { Router, type NextFunction, type Response, type Request } from "express"
import type { IBaseController } from "./interfaces/IBaseController";
import { injectable } from "inversify";
import { validationResult } from "express-validator";

@injectable()
export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    abstract apiPath: string;
    abstract mapRoutes(): Router;

    bindAction(instance: IBaseController, action: Function) {
        return action.bind(instance);
    }

    useValidation(rule: any) {
        return [
            rule,
            (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
                }
                next();
            }
        ];
    }
}