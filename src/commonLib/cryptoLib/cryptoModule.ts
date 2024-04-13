import type { interfaces } from "inversify";
import { Module } from "../containerLib/module";
import { CRYPTO_TYPES } from "./types";
import type { ICrypto } from "./interfaces/ICrypto";
import { Crypto } from "./crypto";

export class CryptoModule extends Module {
    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<ICrypto>(CRYPTO_TYPES.ICrypto).to(Crypto).inSingletonScope();
        });
    }
}