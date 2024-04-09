import type { IUserRepository } from "../../../persistences/IUserRepository";
import type { LoginCommand } from "./loginCommand";

export class LoginCommandHandler {

    private readonly _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async handle(command: LoginCommand) {
        const user = await this._userRepository.getUserByAccount(command.account);
    }
}