

import { MediatorMap } from "../../../be-common/mediatorLib/mediatorMap";
import { LoginCommand } from "./command/login/loginCommand";
import { LoginCommandHandler } from "./command/login/loginCommandHandler";


class HandlerMap extends MediatorMap {
    constructor() {
        super();
        this.set(LoginCommand, LoginCommandHandler);
    }
}

export { HandlerMap };