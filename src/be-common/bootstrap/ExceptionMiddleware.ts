import type { Request, Response, NextFunction } from "express";

export function ExceptionMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error);
    res.status(500).send("An error occurred");
}