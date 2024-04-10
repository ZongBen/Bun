import { Container } from "inversify";
import { TYPES } from "./types";
import type { IMediator } from "../be-common/mediatorLib/interfaces/IMediator";
import { Mediator } from "../be-common/mediatorLib/mediator";
import { UserRepository } from "./infraLayer/repositories/userRepository";
import type { IUserRepository } from "./applicationLayer/persistences/IUserRepository";
import type { IMediatorMap } from "../be-common/mediatorLib/interfaces/IMediatorMap";
import { HandlerMap } from "./applicationLayer/userCase/handlerMap";
import { MEDIATOR_TYPES } from "../be-common/mediatorLib/types";
import type { IMongoClient } from "../be-common/mongoLib/interfaces/IMongoClient";
import { MongoHelper } from "../be-common/mongoLib/mongoHelper";
import { MONGO_TYPES } from "../be-common/mongoLib/types";
import type { IMongoHelper } from "../be-common/mongoLib/interfaces/IMongoHelper";
import type { IMongoInitializer } from "../be-common/mongoLib/interfaces/IMongoInitializer";

const container = new Container();

container.bind<Container>(Container).toConstantValue(container);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inTransientScope();
container.bind<IMediator>(MEDIATOR_TYPES.IMediator).to(Mediator).inTransientScope();
container.bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(HandlerMap).inSingletonScope();
container.bind<IMongoClient>(MONGO_TYPES.IMongoClient).to(MongoHelper).inSingletonScope();
container.bind<IMongoInitializer>(MONGO_TYPES.IMongoInitializer).to(MongoHelper).inSingletonScope();
container.bind<IMongoHelper>(MONGO_TYPES.IMongoHelper).to(MongoHelper).inSingletonScope();
container.bind<string>(MONGO_TYPES.MongoConnectString).toConstantValue('mongodb://localhost:27017/BunDev');

export { container };