import type { App } from "../bootstrapLib/app";
import type { IMediatorMap } from "./interfaces/IMediatorMap";
import { MEDIATOR_TYPES } from "./types";


export class MediatorAppExtension {
    public static regisMap(app: App, HandlerMap: any) {
        app.serviceContainer.bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(HandlerMap).inSingletonScope();
    }
}