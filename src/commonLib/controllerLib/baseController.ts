import { Router, type NextFunction, type Response } from "express"
import type { IBaseController } from "./interfaces/IBaseController";
import { injectable } from "inversify";
import { validationResult } from "express-validator";
import { OkResponse } from "../applicationLib/okResponse";
import { ErrorResponse } from "../applicationLib/errorResponse";

@injectable()
export abstract class BaseController implements IBaseController {
    protected router: Router = Router();
    public abstract apiPath: string;
    public abstract mapRoutes(): Router;

    public bindAction(instance: IBaseController, action: Function) {
        return action.bind(instance)
    }

    public useValidation(rule: any) {
        return [
            rule,
            (req: any, res: Response, next: any) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array().map((error) => error.msg)});
                }
                next();
            }
        ];
    }

    public resvoleResponse(result: OkResponse|ErrorResponse, res: Response, next: NextFunction) {
        if (result instanceof OkResponse) {
            res.send({
                data: result.data,
            });
        } 
        else if (result instanceof ErrorResponse) {
            res.status(result.statusCode).send({
                errors: [result.message]
            });
        }
        next();
    }
}