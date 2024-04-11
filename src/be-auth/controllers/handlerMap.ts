

import { MediatorMap } from "../../be-common/mediatorLib/mediatorMap";
import { LoginCommand } from "../applicationLayer/userCase/command/login/loginCommand";
import { LoginCommandHandler } from "../applicationLayer/userCase/command/login/loginCommandHandler";


export class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginCommandHandler);
    }
}