import { ContainerModule } from "inversify";
import type { IMongoClient } from "./interfaces/IMongoClient";
import type { IMongoHelper } from "./interfaces/IMongoHelper";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";
import { MONGO_TYPES } from "./types";
import { MongoHelper } from "./mongoHelper";

export class mongoModule {
    public static register(connStr: string) {
        const module = new ContainerModule((bind) => {
            bind<IMongoClient>(MONGO_TYPES.IMongoClient).to(MongoHelper).inSingletonScope();
            bind<IMongoInitializer>(MONGO_TYPES.IMongoInitializer).to(MongoHelper).inSingletonScope();
            bind<IMongoHelper>(MONGO_TYPES.IMongoHelper).to(MongoHelper).inSingletonScope();
            bind<string>(MONGO_TYPES.MongoConnectString).toConstantValue(connStr);
        });
        return module;
    }
}