import { inject, injectable } from 'inversify';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWTOKEN_TYPES } from './types';
import type { IJwTokenSetting } from './interfaces/IJwTokenSetting';
import type { IJwTokenHelper } from './interfaces/IJwTokenHelper';

@injectable()
export class JwTokenHelper implements IJwTokenHelper {

    constructor(
        @inject(JWTOKEN_TYPES.IJwTokenSetting) private readonly _jwTokenSetting: IJwTokenSetting
    ) { }

    generateToken(payload: object): string {
        return jwt.sign(payload, this._jwTokenSetting.secret, this._jwTokenSetting.options);
    }

    verifyToken(token: string): boolean | JwtPayload {
        try {
            return jwt.verify(token, this._jwTokenSetting.secret) as JwtPayload;
        }
        catch (err) {
            return false;
        }
    }
}