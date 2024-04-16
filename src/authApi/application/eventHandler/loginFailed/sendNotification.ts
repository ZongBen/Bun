import { injectable } from "inversify";
import type { IEventHandler } from "../../../../commonLib/mediatorLib/interfaces/IEventHandler";
import type { LoginFailedEvent } from "../../useCase/command/login/events/loginFailedEvent";

@injectable()
export class SendNotification implements IEventHandler<LoginFailedEvent> {
    handle(event: LoginFailedEvent): Promise<void> {
        console.log('send notification to account:', event.account);
        return Promise.resolve();
    }
}