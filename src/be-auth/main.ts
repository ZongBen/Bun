import mongoose from "mongoose";
import { App } from "../be-common/bootstrap/app";
import { controllers } from "./controllers";

const app = App.create();
app.setPort(8080);
app.setApiPrefix("/api/be-auth");
mongoose.connect("mongodb://localhost:27017/BunDev");
app.useBodyParser();
app.mapControllers(controllers);
app.useExceptionMiddleware();
app.run();