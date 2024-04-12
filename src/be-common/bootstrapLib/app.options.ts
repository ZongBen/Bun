import type { interfaces } from "inversify";

export class AppOptions {
    port: number = 80;
    routerPrefix: string = "/api";
    controllerPath: string = "/controllers";
    container: interfaces.ContainerOptions | undefined = undefined;
}