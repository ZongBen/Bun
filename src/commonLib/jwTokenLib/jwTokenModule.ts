import type { interfaces } from "inversify";
import { Module } from "../containerLib/module";
import type { IJwTokenSetting } from "./interfaces/IJwTokenSetting";
import { JWTOKEN_TYPES } from "./types";
import type { IJwTokenHelper } from "./interfaces/IJwTokenHelper";
import { JwTokenHelper } from "./jwTokenHelper";
import type { IJwTokenGenerator } from "./interfaces/IJwTokenGenerator";
import type { IJwTokenParser } from "./interfaces/IJwTokenParser";

export class JwTokenModule extends Module {

    constructor(
        private readonly setting: IJwTokenSetting
    ) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IJwTokenSetting>(JWTOKEN_TYPES.IJwTokenSetting).toConstantValue(this.setting);
            bind<IJwTokenHelper>(JWTOKEN_TYPES.IJwTokenHelper).to(JwTokenHelper).inSingletonScope();
            bind<IJwTokenGenerator>(JWTOKEN_TYPES.IJwTokenGenerator).to(JwTokenHelper).inSingletonScope();
            bind<IJwTokenParser>(JWTOKEN_TYPES.IJwTokenParser).to(JwTokenHelper).inSingletonScope();
        });
    }
}