import type { IMongoHelper } from './../be-common/mongoLib/interfaces/IMongoHelper';
import { App } from "../be-common/bootstrapLib/app";
import { MONGO_TYPES } from '../be-common/mongoLib/types';
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../be-common/mediatorLib/mediatorModule';
import { MEDIATOR_TYPES } from '../be-common/mediatorLib/types';
import type { IMediatorMap } from '../be-common/mediatorLib/interfaces/IMediatorMap';
import { HandlerMap } from './applicationLayer/userCase/handlerMap';
import { mongoModule } from '../be-common/mongoLib/mongoModule';
import type { IUserRepository } from './applicationLayer/persistences/IUserRepository';
import { TYPES } from './types';
import { UserRepository } from './infraLayer/repositories/userRepository';
import { regisControllers } from './controllers';

const app = App.createBuilder();
app.setPort(8080);
app.setApiPrefix("/api/be-auth");
app.serviceContainer.load(
    mediatorModule.register(app.serviceContainer),
    mongoModule.register('mongodb://localhost:27017/BunDev')
);
app.serviceContainer.bind<IMediatorMap>(MEDIATOR_TYPES.IMediatorMap).to(HandlerMap).inSingletonScope();
app.serviceContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inTransientScope();
app.serviceContainer.get<IMongoHelper>(MONGO_TYPES.IMongoHelper).regisModel(schemas);

app.useBodyParser();
app.mapController(c => regisControllers(c));
app.useExceptionMiddleware();
app.run();