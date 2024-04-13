import { inject, injectable } from "inversify";
import { CRYPTO_TYPES } from "../cryptoLib/types";
import type { ICrypto } from "../cryptoLib/interfaces/ICrypto";
import type { ICryptoHelper } from "./interfaces/ICryptoHelper";

@injectable()
export class CryptoHelper implements ICryptoHelper {
    constructor(
        @inject(CRYPTO_TYPES.ICrypto) private readonly _crypto: ICrypto
    ) {}

    hashPassword(pwd: string): string {
        const hash = this._crypto.Hashing(pwd).toString();
        return this._crypto.toBase64(hash);
    }
}