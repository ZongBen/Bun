import { MediatorMap } from "../../be-common/mediatorLib/mediatorMap";
import { LoginCommand } from "./userCase/command/login/loginCommand";
import { LoginCommandHandler } from "./userCase/command/login/loginCommandHandler";


export class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginCommandHandler);
    }
}