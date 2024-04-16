import type { NextFunction, Request } from "express";
import type { IResponse } from "../commonLib/controllerLib/response";
import { OkResponse } from "../commonLib/applicationLib/okResponse";
import { ErrorResponse } from "../commonLib/applicationLib/errorResponse";

export const responseParser = (_req: Request, res: IResponse, next: NextFunction) => {
    const result = res.locals.result;
    if (result instanceof OkResponse) {
        res.send({
            result: result.data,
        });
    }
    else if (result instanceof ErrorResponse) {
        res.status(result.statusCode).send({
            errors: [result.message]
        });
    }
    next();
}