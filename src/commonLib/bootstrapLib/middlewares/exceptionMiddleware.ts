import type { Request, Response, NextFunction } from "express";

export function exceptionMiddleware(error: Error, _req: Request, res: Response, next: NextFunction) {
    console.error(error);
    res.status(500).json({ errors: ["Unexpected Error"] });
    next();
}