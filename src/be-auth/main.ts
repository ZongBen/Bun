import { App } from "../be-common/bootstrapLib/app";
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../be-common/mediatorLib/mediatorModule';
import { HandlerMap } from './applicationLayer/userCase/handlerMap';
import { mongoModule } from '../be-common/mongoLib/mongoModule';
import { regisControllers } from './controllers';
import { repositoryModule } from './infraLayer/repositories/repositoryModule';
import { MongoAppExtension } from '../be-common/mongoLib/mongo.app.extension';
import { MediatorAppExtension } from "../be-common/mediatorLib/mediator.app.extension";

const app = App.createBuilder();
app.setPort(8080);
app.setApiPrefix("/api/be-auth");
app.serviceContainer.load(
    new mediatorModule(app.serviceContainer).regisMoudle(),
    new mongoModule('mongodb://localhost:27017/BunDev').regisMoudle(),
    new repositoryModule().regisMoudle()
);
MediatorAppExtension.regisMap(app.serviceContainer, HandlerMap);
MongoAppExtension.regisSchemas(app.serviceContainer, schemas);
app.useBodyParser();
app.mapController(c => regisControllers(c));
app.useExceptionMiddleware();
app.run();