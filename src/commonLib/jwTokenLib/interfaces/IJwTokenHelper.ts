import type { JwtPayload } from "jsonwebtoken";

export interface IJwTokenHelper {
    generateToken(payload: object): string;
    verifyToken(token: string): string|JwtPayload;
}