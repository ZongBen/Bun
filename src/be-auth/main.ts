import { App } from "../be-common/bootstrapLib/app";
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../be-common/mediatorLib/mediatorModule';
import { HandlerMap } from './applicationLayer/handlerMap';
import { mongoModule } from '../be-common/mongoLib/mongoModule';
import { MongoAppExtension } from '../be-common/mongoLib/mongo.app.extension';

const app = App.createBuilder(opt => {
    opt.port = 8080;
    opt.routerPrefix = "/api/be-auth";
    opt.container = {
        autoBindInjectable: true,
        defaultScope: "Transient",
    };
});
app.serviceContainer.load(
    new mediatorModule(app.serviceContainer, HandlerMap).getModule(),
    new mongoModule(app.configuration.mongo.url).getModule(),
);
MongoAppExtension.regisSchemas(app.serviceContainer, schemas);
app.useBodyParser();
app.useReqLogger();
app.mapController();
app.useExceptionMiddleware();
app.run();