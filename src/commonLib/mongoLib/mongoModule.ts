import { type interfaces } from "inversify";
import type { IMongoClient } from "./interfaces/IMongoClient";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";
import { MONGO_TYPES } from "./types";
import { Module } from "../containerLib/module";
import { MongoClient } from "./mongoClient";
import { MongoInitializer } from "./mongoInitializer";

export class mongoModule extends Module {
    constructor(private readonly _connStr: string) {
        super();
    }

    protected bindModule(fn: (regis: interfaces.ContainerModuleCallBack) => interfaces.ContainerModuleCallBack): interfaces.ContainerModuleCallBack {
        return fn((bind) => {
            bind<IMongoClient>(MONGO_TYPES.IMongoClient).to(MongoClient).inTransientScope();
            bind<IMongoInitializer>(MONGO_TYPES.IMongoInitializer).to(MongoInitializer).inSingletonScope();
            bind<string>(MONGO_TYPES.MongoConnectString).toConstantValue(this._connStr);
        });
    }
}
