import express from "express";
import "reflect-metadata";
require('express-async-errors');
import { exceptionMiddleware } from "./exceptionMiddleware";
import { Container } from "inversify";
import type { IBaseController } from "../controller/interfaces/IBaseController";
export class App {
  private _app: express.Application;
  private _port: number = 80;
  private _apiPrefix: string = "/api";
  public serviceContainer: Container;

  private constructor() {
    this._app = express();
    this.serviceContainer = new Container();
  }

  public static createBuilder() {
    return new App();
  }

  public setPort(port: number) {
    this._port = port;
    return this;
  }

  public setApiPrefix(prefix: string) {
    this._apiPrefix = prefix;
    return this;
  }

  public mapController(fn: (container: Container) => IBaseController[]) {
    fn(this.serviceContainer).forEach(c => {
      this._app.use(`${this._apiPrefix}${c.apiPath}`, c.mapRoutes());
    });
    return this;
  }

  public useExceptionMiddleware() {
    this._app.use(exceptionMiddleware)
    return this;
  }

  public useBodyParser() {
    this._app.use(express.json());
    return this;
  }

  public run() {
    this._app.listen(this._port, () => {
      console.log(`Listening on port http://localhost:${this._port}${this._apiPrefix}`);
    });
  }
}