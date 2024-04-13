import { App } from "../commonLib/bootstrapLib/app";
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../commonLib/mediatorLib/mediatorModule';
import { HandlerMap } from './applicationLayer/handlerMap';
import { mongoModule } from '../commonLib/mongoLib/mongoModule';
import { MongoAppExtension } from '../commonLib/mongoLib/mongo.app.extension';
import { CryptoModule } from "../commonLib/cryptoLib/cryptoModule";

const app = App.createBuilder(opt => {
    opt.port = 8080;
    opt.routerPrefix = "/auth/api";
    opt.container = {
        autoBindInjectable: true,
        defaultScope: "Transient",
    };
});
app.serviceContainer.load(
    new mediatorModule(app.serviceContainer, HandlerMap).getModule(),
    new mongoModule(app.configuration.mongo.url).getModule(),
    new CryptoModule().getModule()
);
MongoAppExtension.regisSchemas(app.serviceContainer, schemas);
app.useBodyParser();
app.useReqLogger();
app.mapController();
app.useExceptionMiddleware();
app.run();