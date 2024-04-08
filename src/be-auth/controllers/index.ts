import type { BaseController } from "../../be-common/controller/baseController";
import { AuthController } from "./authController";
import { HealthCheckController } from "./healthCheckController";

export const controllers: BaseController[] = [
    new AuthController(),
    new HealthCheckController()
];