import type { BaseController } from "../../be-common/controller/baseController";
import { container } from "../di.config";
import { AuthController } from "./authController";

export const controllers: BaseController[] = [
    container.resolve(AuthController)
];