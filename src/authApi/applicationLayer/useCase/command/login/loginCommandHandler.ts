import type { IReqHandler } from '../../../../../commonLib/applicationLib/interfaces/IReqHandler';
import type { IUserRepository } from "../../../persistences/IUserRepository";
import { LoginCommand } from "./loginCommand";
import { inject, injectable } from 'inversify';
import { UserRepository } from '../../../../infraLayer/repositories/userRepository';
import { LoginError } from './loginError';
import { OkResponse } from '../../../../../commonLib/applicationLib/okResponse';
import type { ErrorResponse } from '../../../../../commonLib/applicationLib/errorResponse';
import { CryptoHelper } from '../../../../../commonLib/applicationLib/cryptoHelper';
import type { ICryptoHelper } from '../../../../../commonLib/applicationLib/interfaces/ICryptoHelper';
import { JWTOKEN_TYPES } from '../../../../../commonLib/jwTokenLib/types';
import type { IJwTokenHelper } from '../../../../../commonLib/jwTokenLib/interfaces/IJwTokenHelper';
import { LoginResult } from './loginResult';

@injectable()
export class LoginCommandHandler implements IReqHandler<LoginCommand, OkResponse|ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
        @inject(CryptoHelper) private readonly _cryptoHelper: ICryptoHelper,
        @inject(JWTOKEN_TYPES.IJwTokenHelper) private readonly _jwTokenHelper: IJwTokenHelper
    ) {

    }

    async handle(req: LoginCommand) {
        const user = await this._userRepository.getUserByAccount(req.account);
        if (!user || !user.ValidPassword(this._cryptoHelper.hashPassword(req.password))) {
            return new LoginError();
        }
        const token = this._userRepository.getUserToken(user, this._jwTokenHelper);
        return new OkResponse(new LoginResult(token));
    }
}