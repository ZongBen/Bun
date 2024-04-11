import { Container, type interfaces } from "inversify";
import type { IMediator } from "./interfaces/IMediator";
import { MEDIATOR_TYPES } from "./types";
import { Mediator } from "./mediator";
import { Module } from "../domainLib/module";

export class mediatorModule extends Module {    
    constructor(private _container: Container) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IMediator>(MEDIATOR_TYPES.IMediator).to(Mediator).inTransientScope();
            bind<Container>(Container).toConstantValue(this._container);
        });
    }   
}

