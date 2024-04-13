import type { SignOptions } from "jsonwebtoken";
import type { IJwTokenSetting } from "./interfaces/IJwTokenSetting";

export class JwTokenSetting implements IJwTokenSetting {
    constructor(
        public readonly secret: string,
        public readonly options: SignOptions
    ) { }
}