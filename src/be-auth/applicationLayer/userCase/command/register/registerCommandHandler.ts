import { inject, injectable } from 'inversify';
import type { IReqHandler } from '../../../../../be-common/applicationLib/interfaces/IReqHandler';
import { RegisterCommand } from './registerCommand';
import { UserRepository } from '../../../../infraLayer/repositories/userRepository';
import type { IUserRepository } from '../../../persistences/IUserRepository';
import { OkResponse } from '../../../../../be-common/applicationLib/okResponse';
import type { ErrorResponse } from '../../../../../be-common/applicationLib/errorResponse';
import { DuplicatedError } from './duplicatedError';


@injectable()
export class RegisterCommandHandler implements IReqHandler<RegisterCommand, OkResponse|ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
    ) {}

    async handle(req: RegisterCommand) {
        const user = await this._userRepository.getUserByAccount(req.account);
        if (user) {
            return new DuplicatedError();
        }
        await this._userRepository.createUser(req);
        return new OkResponse('register success');
    }
}