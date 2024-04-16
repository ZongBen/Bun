import { Container, inject, injectable } from "inversify";
import type { IMediator } from './interfaces/IMediator';
import type { IReqHandler } from "../applicationLib/interfaces/IReqHandler";
import type { IMediatorMap } from "./interfaces/IMediatorMap";
import { MEDIATOR_TYPES } from "./types";
import type { INotification } from "./interfaces/INotification";

@injectable()
export class Mediator implements IMediator {

    constructor(
        @inject(Container) private readonly _container: Container,
        @inject(MEDIATOR_TYPES.IMediatorMap) private readonly _mediatorMap: IMediatorMap
    ) {
    }

    send<TRes>(req: any): Promise<TRes> {
        const handler = this._mediatorMap.get(req.constructor);
        if (!handler) {
            throw new Error('handler not found');
        }
        const handlerInstance = this._container.resolve(handler) as IReqHandler<any, TRes>;
        console.log('send to handler:', handlerInstance.constructor.name);
        return handlerInstance.handle(req);
    }

    publish<T extends INotification<T>>(event: T): Promise<void> {
        for (const handler of event.getSubscribers()) {
            const handlerInstance = this._container.resolve(handler);
            console.log('publish to handler:', handlerInstance.constructor.name);
            handlerInstance.handle(event);
        }
        return Promise.resolve();
    }
}