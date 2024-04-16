import type { NextFunction, Request } from "express";
import { inject } from "inversify";
import type { IJwTokenParser } from "../../jwTokenLib/interfaces/IJwTokenParser";
import { JWTOKEN_TYPES } from "../../jwTokenLib/types";
import type { IResponse } from "../response";
import { type JwtPayload } from 'jsonwebtoken';


export class jwtValidHandler {

    constructor(
        @inject(JWTOKEN_TYPES.IJwTokenParser) private readonly _jwTokenParser: IJwTokenParser
    ) { }

    handler = (req: Request, res: IResponse, next: NextFunction) => {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).send({ errors: ["Unauthorized"] });
            return;
        }
        token = token.slice(7, token.length);
        const payload = this._jwTokenParser.verifyToken(token);
        if (!payload) {
            res.status(401).send({ errors: ["Unauthorized"] });
            return;
        }
        res.locals.jwtPayload = payload as JwtPayload;
        next();
    }
}