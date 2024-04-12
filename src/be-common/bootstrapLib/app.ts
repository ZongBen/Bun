require('express-async-errors');
import express from "express";
import "reflect-metadata";
import { exceptionMiddleware } from "./exceptionMiddleware";
import { Container } from "inversify";
import type { IBaseController } from "../controllerLib/interfaces/IBaseController";
import { _args } from "./app.args";
import { AppOptions } from "./app.options";
import { Glob } from "bun";

export class App {
  private _app: express.Application;
  private _executeRootPath: string = App._getExecuteRootPath();
  public serviceContainer: Container;
  public options: AppOptions;
  public configuration: any;

  private constructor(options: AppOptions) {
    this._app = express();
    this.options = options;
    this.serviceContainer = new Container(options.container);
    this.configuration = this._createConfig();
  }

  private _createConfig() {
    const configFile = this._executeRootPath + this.options.configPath + `/config.${_args.values.env}.json`;
    const config = require(configFile);
    return config;
  }

  private static _getExecuteRootPath() {
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

  public mapController() {
    const controllerRootPath = this._executeRootPath + this.options.controllerPath;
    const glob = new Glob('*Controller.ts');
    for (const file of glob.scanSync({
      cwd: controllerRootPath
    })) {
      const controllerModule = require(controllerRootPath + '/' + file);
      for(const c in controllerModule) {
        const _ctor = this.serviceContainer.resolve(controllerModule[c]) as IBaseController;
        this._app.use(`${this.options.routerPrefix}${_ctor.apiPath}`, _ctor.mapRoutes());
      } 
    }
    return this;
  }

  public useExceptionMiddleware() {
    this._app.use(exceptionMiddleware)
    return this;
  }

  public useReqLogger() {
    this._app.use((req, _res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
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