import type { Router } from "express";

export interface IBaseController {
    mapRoutes(): Router;
    apiPath: string;
}