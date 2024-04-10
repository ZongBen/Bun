import { Container, ContainerModule } from "inversify";
import type { IMediator } from "./interfaces/IMediator";
import { MEDIATOR_TYPES } from "./types";
import { Mediator } from "./mediator";

export class mediatorModule {
    public static register(container: Container) {
        const module = new ContainerModule((bind) => {
            bind<IMediator>(MEDIATOR_TYPES.IMediator).to(Mediator).inTransientScope();
            bind<Container>(Container).toConstantValue(container);
        });
        return module;
    }
}