import express from "express";
import "reflect-metadata";
require('express-async-errors');
import { exceptionMiddleware } from "./exceptionMiddleware";
import { Container } from "inversify";
import type { IBaseController } from "../controllerLib/interfaces/IBaseController";
import { _args } from "./app.args";
import { AppOptions } from "./app.options";
//const config = require(`E:\\github\\Bun\\src\\be-auth\\config\\config.local.ts`);

export class App {
  private _app: express.Application;
  public serviceContainer: Container;
  public options: AppOptions;

  private constructor(options: AppOptions) {
    this._app = express();
    this.serviceContainer = new Container();
    this.options = options;
  }

  public static createBuilder(fn: (options: AppOptions) => void = () => {}) {
    const options = new AppOptions();
    fn(options);
    return new App(options);
  }

  public mapController(fn: (container: Container) => IBaseController[]) {
    fn(this.serviceContainer).forEach(c => {
      this._app.use(`${this.options.routerPrefix}${c.apiPath}`, c.mapRoutes());
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
    this._app.listen(this.options.port, () => {
      console.log(`Listening on port http://localhost:${this.options.port}${this.options.routerPrefix}`);
    });
  }
}