import type { IReq } from "./IReq";

export interface IReqHandler<in TReq extends IReq<TRes>, TRes> {
    handle(req: TReq): Promise<TRes>;
}