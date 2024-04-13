import type { IReqHandler } from '../../../../../commonLib/applicationLib/interfaces/IReqHandler';
import type { IUserRepository } from "../../../persistences/IUserRepository";
import { LoginCommand } from "./loginCommand";
import { inject, injectable } from 'inversify';
import { UserRepository } from '../../../../infraLayer/repositories/userRepository';
import { LoginError } from './loginError';
import { OkResponse } from '../../../../../commonLib/applicationLib/okResponse';
import type { ErrorResponse } from '../../../../../commonLib/applicationLib/errorResponse';

@injectable()
export class LoginCommandHandler implements IReqHandler<LoginCommand, OkResponse|ErrorResponse> {

    constructor(
        @inject(UserRepository) private readonly _userRepository: IUserRepository,
    ) {

    }

    async handle(req: LoginCommand) {
        var user = await this._userRepository.getUserByAccount(req.account);
        if (!user) {
            return new LoginError();
        }
        return new OkResponse('login success get your token here');
    }
}