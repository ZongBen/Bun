import type { interfaces } from "inversify";
import { Module } from "../../../be-common/containerLib/module";
import type { IUserRepository } from "../../applicationLayer/persistences/IUserRepository";
import { UserRepository } from "./userRepository";
import { TYPES } from "./types";

export class repositoryModule extends Module {
    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inTransientScope();
        });
    }
}