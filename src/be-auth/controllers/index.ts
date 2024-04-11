import type { Container } from "inversify";
import { AuthController } from "./authController";

export const regisControllers = (container: Container) => {
    return [
        container.resolve(AuthController)
    ];
}