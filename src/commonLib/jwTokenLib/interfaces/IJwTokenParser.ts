import type { JwtPayload } from "jsonwebtoken";

export interface IJwTokenParser {
    verifyToken(token: string): boolean|JwtPayload;
}