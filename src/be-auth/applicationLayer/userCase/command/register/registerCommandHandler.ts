import { inject, injectable } from 'inversify';
import type { IReqHandler } from '../../../../../be-common/applicationLib/interfaces/IReqHandler';
import { RegisterCommand } from './registerCommand';
import { UserRepository } from '../../../../infraLayer/repositories/userRepository';
import type { IUserRepository } from '../../../persistences/IUserRepository';
import { OkResponse } from '../../../../../be-common/applicationLib/okResponse';
import type { ErrorResponse } from '../../../../../be-common/applicationLib/errorResponse';
import { DuplicatedError } from './duplicatedError';
import { RegisterResult } from './registerResult';
import { UserEntity } from '../../../../domainLayer/user/userEntity';


@injectable()
export class RegisterCommandHandler implements IReqHandler<RegisterCommand, OkResponse|ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
    ) {}

    async handle(req: RegisterCommand) {
        const IsUserExist = (await this._userRepository.getUserByAccount(req.account)) !== null;
        if (IsUserExist) {
            return new DuplicatedError();
        }
        const user = await this._userRepository.createUser(UserEntity.Create(req.account, req.password, req.username));
        return new OkResponse(new RegisterResult(user.account, user.username));
    }
}