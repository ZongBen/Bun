import type { interfaces } from "inversify";

type allowAnonymousPath = {
    path: string;
    method: string;
}

export class AppOptions {
    port: number = 80;
    routerPrefix: string = "/api";
    controllerPath: string = "/controllers";
    container: interfaces.ContainerOptions | undefined = undefined;
    configPath: string = "/config";
    allowAnonymousPath: allowAnonymousPath[] = [];
}
