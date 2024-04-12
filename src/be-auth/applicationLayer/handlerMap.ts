import { MediatorMap } from "../../be-common/mediatorLib/mediatorMap";
import { LoginCommand } from "./userCase/command/login/loginCommand";
import { LoginCommandHandler } from "./userCase/command/login/loginCommandHandler";
import { RegisterCommand } from "./userCase/command/register/registerCommand";
import { RegisterCommandHandler } from "./userCase/command/register/registerCommandHandler";


export class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginCommandHandler);
        this.set(RegisterCommand, RegisterCommandHandler)
    }
}