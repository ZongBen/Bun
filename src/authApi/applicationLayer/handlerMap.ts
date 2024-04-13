import { MediatorMap } from "../../commonLib/mediatorLib/mediatorMap";
import { LoginCommand } from "./useCase/command/login/loginCommand";
import { LoginCommandHandler } from "./useCase/command/login/loginCommandHandler";
import { RegisterCommand } from "./useCase/command/register/registerCommand";
import { RegisterCommandHandler } from "./useCase/command/register/registerCommandHandler";


export class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginCommandHandler);
        this.set(RegisterCommand, RegisterCommandHandler)
    }
}