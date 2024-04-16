import type { IEventHandler } from "../../../../../../commonLib/mediatorLib/interfaces/IEventHandler";
import type { INotification } from "../../../../../../commonLib/mediatorLib/interfaces/INotification";
import { SendNotification } from "../../../../eventHandler/loginFailed/sendNotification";

export class LoginFailedEvent implements INotification<LoginFailedEvent> {
    constructor(
        public readonly account: string
    ) { }
    
    getSubscribers(): (new (...args: any[]) => IEventHandler<LoginFailedEvent>)[] {
        return [
            SendNotification
        ];
    }
}