import type { IMongoHelper } from './../be-common/mongoLib/interfaces/IMongoHelper';
import { App } from "../be-common/bootstrap/app";
import { controllers } from "./controllers";
import { container } from "./di.config";
import { MONGO_TYPES } from '../be-common/mongoLib/types';
import { schemas } from './infraLayer/collections';

const app = App.create();
app.setPort(8080);
app.setApiPrefix("/api/be-auth");

container.get<IMongoHelper>(MONGO_TYPES.IMongoHelper).regisModel(schemas);

app.useBodyParser();
app.mapControllers(controllers);
app.useExceptionMiddleware();
app.run();