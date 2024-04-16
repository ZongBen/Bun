import { Router, type NextFunction, type Request, type Response } from "express"
import type { IBaseController } from "./interfaces/IBaseController";
import { injectable } from "inversify";
import { Result, validationResult, type ValidationError } from "express-validator";

@injectable()
export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    abstract apiPath: string;
    abstract mapRoutes(): Router;

    bindAction(instance: IBaseController, action: Function) {
        return action.bind(instance);
    }

    useValidation(rule: any, errorHandler: (error: Result<ValidationError>) => string[]) {
        return [
            rule,
            (req: Request, res: Response, next: NextFunction) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    const errorMessage = errorHandler(errors);
                    res.status(400).send({
                        errors: errorMessage
                    });
                    return;
                }
                next();
            }
        ];
    }
}