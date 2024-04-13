import { inject, injectable } from 'inversify';
import type { IReqHandler } from '../../../../../commonLib/applicationLib/interfaces/IReqHandler';
import { RegisterCommand } from './registerCommand';
import { UserRepository } from '../../../../infraLayer/repositories/userRepository';
import type { IUserRepository } from '../../../persistences/IUserRepository';
import { OkResponse } from '../../../../../commonLib/applicationLib/okResponse';
import type { ErrorResponse } from '../../../../../commonLib/applicationLib/errorResponse';
import { DuplicatedError } from './duplicatedError';
import { RegisterResult } from './registerResult';
import { UserEntity } from '../../../../domainLayer/user/userEntity';
import { CRYPTO_TYPES } from '../../../../../commonLib/cryptoLib/types';
import type { ICrypto } from '../../../../../commonLib/cryptoLib/interfaces/ICrypto';


@injectable()
export class RegisterCommandHandler implements IReqHandler<RegisterCommand, OkResponse|ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
        @inject(CRYPTO_TYPES.ICrypto) private readonly _crypto: ICrypto
    ) {}

    async handle(req: RegisterCommand) {
        const IsUserExist = (await this._userRepository.getUserByAccount(req.account)) !== null;
        if (IsUserExist) {
            return new DuplicatedError();
        }
        const hashPwd = this._crypto.Hashing(req.password).toString();
        const base64Pwd = this._crypto.toBase64(hashPwd);
        const user = await this._userRepository.createUser(UserEntity.Create(req.account, base64Pwd, req.userName));
        return new OkResponse(new RegisterResult(user.account, user.userName));
    }
}