import express from "express";
import type { IBaseController } from "../../be-common/controller/interfaces/IBaseController";
import { ExceptionMiddleware } from "../../be-common/bootstrap/ExceptionMiddleware";

export class App {
  private _app: express.Application;
  private _port: number = 80;
  private _apiPrefix: string = "/api";

  private constructor() {
    this._app = express();
  }

  public static create() {
    return new App();
  }

  public setPort(port: number) {
    this._port = port;
  }

  public setApiPrefix(prefix: string) {
    this._apiPrefix = prefix;
  }

  public mapControllers(controllers: IBaseController[]) {
    controllers.forEach(c => {
      this._app.use(`${this._apiPrefix}${c.apiPath}`, c.mapRoutes());
    });
  }

  public useExceptionMiddleware() {
    this._app.use(ExceptionMiddleware)
  }

  public useBodyParser() {
    this._app.use(express.json());
  }

  public run() {
    this._app.listen(this._port, () => {
      console.log(`Listening on port http://localhost:${this._port}${this._apiPrefix}`);
    });
  }
}