import type { SignOptions } from "jsonwebtoken";

export interface IJwTokenSetting {
    secret: string;
    options: SignOptions
}