import { App } from "../be-common/bootstrapLib/app";
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../be-common/mediatorLib/mediatorModule';
import { HandlerMap } from './controllers/handlerMap';
import { mongoModule } from '../be-common/mongoLib/mongoModule';
import { resovleControllers } from './controllers';
import { repositoryModule } from './infraLayer/repositories/repositoryModule';
import { MongoAppExtension } from '../be-common/mongoLib/mongo.app.extension';

const app = App.createBuilder(opt => {
    opt.port = 8080;
    opt.routerPrefix = "/api/be-auth";
});
app.serviceContainer.load(
    new mediatorModule(app.serviceContainer, HandlerMap).getModule(),
    new mongoModule(app.configuration.mongo.url).getModule(),
    new repositoryModule().getModule()
);
MongoAppExtension.regisSchemas(app.serviceContainer, schemas);
app.useBodyParser();
app.mapController(c => resovleControllers(c));
app.useExceptionMiddleware();
app.run();