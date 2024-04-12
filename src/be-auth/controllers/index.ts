import type { Container } from "inversify";
import type { IBaseController } from "../../be-common/controllerLib/interfaces/IBaseController";
import { Glob } from "bun";

export const resovleControllers = (container: Container): IBaseController[] => {
    let resovledControllers: IBaseController[] = [];
    const glob = new Glob('*Controller.ts');
    for (const file of glob.scanSync({
        cwd: __dirname
    })) {
        const controller = require(__dirname + '/' + file);
        for(const key in controller) {
            resovledControllers.push(container.resolve(controller[key]));
        } 
    }
    return resovledControllers
}