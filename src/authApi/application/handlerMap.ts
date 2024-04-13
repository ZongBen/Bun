import { MediatorMap } from "../../commonLib/mediatorLib/mediatorMap";
import { LoginCommand } from "./useCase/command/login/loginCommand";
import { LoginHandler } from "./useCase/command/login/loginHandler";
import { RegisterCommand } from "./useCase/command/register/registerCommand";
import { RegisterHandler } from "./useCase/command/register/registerHandler";


export class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginHandler);
        this.set(RegisterCommand, RegisterHandler)
    }
}