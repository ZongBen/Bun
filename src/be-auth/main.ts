import { App } from "../be-common/bootstrap/app";
import { controllers } from "./controllers";

const app = App.create();
app.setPort(8080);
app.setApiPrefix("/api/be-auth");
app.useBodyParser();
app.mapControllers(controllers);
app.useExceptionMiddleware();
app.run();