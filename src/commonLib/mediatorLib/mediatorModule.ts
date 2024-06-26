import { Container, type interfaces } from "inversify";
import type { IMediator } from "./interfaces/IMediator";
import { MEDIATOR_TYPES } from "./types";
import { Mediator } from "./mediator";
import { Module } from "../containerLib/module";
import type { IMediatorMap } from "./interfaces/IMediatorMap";
import type { ISender } from "./interfaces/ISender";
import type { IPublisher } from "./interfaces/IPublisher";

export class mediatorModule extends Module {
    constructor(private readonly _container: Container, private readonly _mediatorMap: any) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(this._mediatorMap).inSingletonScope();
            bind<IMediator>(MEDIATOR_TYPES.IMediator).to(Mediator).inTransientScope();
            bind<ISender>(MEDIATOR_TYPES.ISender).to(Mediator).inTransientScope();
            bind<IPublisher>(MEDIATOR_TYPES.IPublisher).to(Mediator).inTransientScope();
            bind<Container>(Container).toConstantValue(this._container);
        });
    }
}

