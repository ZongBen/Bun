import express from "express";
import "reflect-metadata";
require('express-async-errors');
import { exceptionMiddleware } from "./exceptionMiddleware";
import { Container } from "inversify";
import type { IBaseController } from "../controllerLib/interfaces/IBaseController";
import { _args } from "./app.args";
import { AppOptions } from "./app.options";
import { Glob } from "bun";

export class App {
  private _app: express.Application;
  private _rootPath: string = App.RootPath();
  public serviceContainer: Container;
  public options: AppOptions;
  public configuration: any;

  private constructor(options: AppOptions) {
    this._app = express();
    this.options = options;
    this.serviceContainer = new Container({ autoBindInjectable: true });
    this.configuration = this.createConfig();
  }

  private createConfig() {
    const path = this._rootPath + `/config/config.${_args.values.env}.ts`;
    const { config } = require(path);
    return config;
  }

  private static RootPath() {
    const unixLastSlash = _args.positionals[1].lastIndexOf('/');
    const windowsLastSlash = _args.positionals[1].lastIndexOf('\\');
    const lastSlash = unixLastSlash > windowsLastSlash ? unixLastSlash : windowsLastSlash;
    return _args.positionals[1].substring(0, lastSlash);
  }

  public static createBuilder(fn: (options: AppOptions) => void = () => {}) {
    const options = new AppOptions();
    fn(options);
    return new App(options);
  }

  /*
  public mapController(fn: (container: Container) => IBaseController[]) {
    fn(this.serviceContainer).forEach(c => {
      this._app.use(`${this.options.routerPrefix}${c.apiPath}`, c.mapRoutes());
    });
    return this;
  }
  */

  public mapController() {
    const glob = new Glob('*Controller.ts');
    for (const file of glob.scanSync({
      cwd: this._rootPath + '/controllers'
    })) {
      const controller = require(this._rootPath + '/controllers/' + file);
      for(const key in controller) {
        const c = this.serviceContainer.resolve(controller[key]) as IBaseController;
        this._app.use(`${this.options.routerPrefix}${c.apiPath}`, c.mapRoutes());
      } 
    }
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