import type { IReqHandler } from '../../../../../be-common/applicationLib/interfaces/IReqHandler';
import type { IUserRepository } from "../../../persistences/IUserRepository";
import { LoginCommand } from "./loginCommand";
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../../types';

@injectable()
export class LoginCommandHandler implements IReqHandler<LoginCommand, string> {

    constructor(
        @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    ) {

    }

    async handle(req: LoginCommand): Promise<string> {
        var user = await this._userRepository.getUserByAccount(req.account);
        console.log(user);
        return 'loginCommand handled';
    }
}