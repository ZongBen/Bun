import { type interfaces } from "inversify";
import type { IMongoClient } from "./interfaces/IMongoClient";
import type { IMongoHelper } from "./interfaces/IMongoHelper";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";
import { MONGO_TYPES } from "./types";
import { MongoHelper } from "./mongoHelper";
import { Module } from "../domainLib/module";

export class mongoModule extends Module {
    constructor(private _connStr: string) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IMongoClient>(MONGO_TYPES.IMongoClient).to(MongoHelper).inSingletonScope();
            bind<IMongoInitializer>(MONGO_TYPES.IMongoInitializer).to(MongoHelper).inSingletonScope();
            bind<IMongoHelper>(MONGO_TYPES.IMongoHelper).to(MongoHelper).inSingletonScope();
            bind<string>(MONGO_TYPES.MongoConnectString).toConstantValue(this._connStr);
        });
    }
}