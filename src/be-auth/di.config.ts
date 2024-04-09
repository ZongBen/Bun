import { Container } from "inversify";
import { MongoClient } from "../be-common/mongoLib/mongoClient";
import { TYPES } from "./types";
import type { IMongoInitializer } from "../be-common/mongoLib/interfaces/IMongoInitializer";
import type { IUserRepository } from "./applicationLayer/persistences/IUserRepository";
import { UserRepository } from "./infraLayer/repositories/userRepository";
import type { IMongoClient } from "../be-common/mongoLib/interfaces/IMongoClient";

const container = new Container();
container.bind<IMongoClient>(TYPES.IMongoClient).to(MongoClient).inSingletonScope();
container.bind<IMongoInitializer>(TYPES.IMongoInitializer).to(MongoClient).inSingletonScope();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inTransientScope();

export { container };