import type { BaseController } from "../../be-common/controller/baseController";
import { AuthController } from "./authController";

export const controllers: BaseController[] = [
    new AuthController(),
];