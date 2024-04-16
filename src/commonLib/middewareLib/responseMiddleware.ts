import type { NextFunction, Request } from "express";
import type { IResponse } from "../controllerLib/response";
import { OkResponse } from "../applicationLib/okResponse";
import { ErrorResponse } from "../applicationLib/errorResponse";

export const responseMiddleware = (_req: Request, res: IResponse, next: NextFunction) => {
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