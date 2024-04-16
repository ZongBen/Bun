import type { INotification } from "./INotification";

export interface IEventHandler<T extends INotification<T>> {
    handle(event: T): Promise<void>;
}