import type { Container } from "inversify";
import type { IMediatorMap } from "./interfaces/IMediatorMap";
import { MEDIATOR_TYPES } from "./types";


export class MediatorAppExtension {
    public static regisMap(container: Container, HandlerMap: any) {
        container.bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(HandlerMap).inSingletonScope();
    }
}