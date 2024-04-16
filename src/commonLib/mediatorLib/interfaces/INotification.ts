import type { IEventHandler } from "./IEventHandler";

export interface INotification<T extends INotification<T>> {
    getSubscribers(): Array<new (...args: any[]) => IEventHandler<T>>;
}