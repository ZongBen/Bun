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
import { CryptoHelper } from '../../../../../commonLib/applicationLib/cryptoHelper';
import type { ICryptoHelper } from '../../../../../commonLib/applicationLib/interfaces/ICryptoHelper';

@injectable()
export class RegisterCommandHandler implements IReqHandler<RegisterCommand, OkResponse | ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
        @inject(CryptoHelper) private readonly _cryptoHelper: ICryptoHelper
    ) { }

    async handle(req: RegisterCommand) {
        const IsUserExist = (await this._userRepository.getUserByAccount(req.account)) !== null;
        if (IsUserExist) {
            return new DuplicatedError();
        }
        const user = await this._userRepository.createUser(
            UserEntity.Create(
                req.account,
                this._cryptoHelper.hashPassword(req.password),
                req.userName
            )
        );
        return new OkResponse(new RegisterResult(user.account, user.userName));
    }
}