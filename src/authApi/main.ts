import { App } from "../commonLib/bootstrapLib/app";
import { schemas } from './infraLayer/collections';
import { mediatorModule } from '../commonLib/mediatorLib/mediatorModule';
import { HandlerMap } from './applicationLayer/handlerMap';
import { mongoModule } from '../commonLib/mongoLib/mongoModule';
import { MongoAppExtension } from '../commonLib/mongoLib/mongo.app.extension';
import { CryptoModule } from "../commonLib/cryptoLib/cryptoModule";
import { JwTokenModule } from "../commonLib/jwTokenLib/jwTokenModule";
import { JwTokenSetting } from "../commonLib/jwTokenLib/jwTokenSetting";

const app = App.createBuilder(opt => {
    opt.port = 8080;
    opt.routerPrefix = "/auth/api";
    opt.container = {
        autoBindInjectable: true,
        defaultScope: "Transient",
    };
    opt.allowAnonymousPath = [
        "/auth/login",
        "/auth/register",
    ]
});
app.serviceContainer.load(
    new mediatorModule(app.serviceContainer, HandlerMap).getModule(),
    new mongoModule(app.configuration.mongo.url).getModule(),
    new CryptoModule().getModule(),
    new JwTokenModule(new JwTokenSetting(
        app.configuration.jwToken.secret,
        app.configuration.jwToken.options
    )).getModule()
);
MongoAppExtension.regisSchemas(app.serviceContainer, schemas);
app.useBodyParser();
app.useReqLogger();
app.useJwtValidMiddleware();
app.mapController();
app.useExceptionMiddleware();
app.run();