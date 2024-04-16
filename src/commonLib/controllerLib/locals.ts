import type { JwtPayload } from "jsonwebtoken";

export interface Locals extends Record<string, any> {
    jwtPayload: JwtPayload;
    result: any;
    [key: string]: any;
} 