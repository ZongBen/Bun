import type { IPublisher } from "./IPublisher";
import type { ISender } from "./ISender";

export interface IMediator extends ISender, IPublisher {

}