import { Container, type interfaces } from "inversify";
import type { IMediator } from "./interfaces/IMediator";
import { MEDIATOR_TYPES } from "./types";
import { Mediator } from "./mediator";
import { Module } from "../domainLib/module";
import type { IMediatorMap } from "./interfaces/IMediatorMap";

export class mediatorModule extends Module {    
    constructor(private _container: Container, private _mediatorMap: any) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(this._mediatorMap).inSingletonScope();
            bind<IMediator>(MEDIATOR_TYPES.IMediator).to(Mediator).inTransientScope();
            bind<Container>(Container).toConstantValue(this._container);
        });
    }   
}

