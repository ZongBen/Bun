import type express from "express";
import type { Locals } from './locals';

export interface IResponse<ResBody = any> extends express.Response<ResBody, Locals> {
}