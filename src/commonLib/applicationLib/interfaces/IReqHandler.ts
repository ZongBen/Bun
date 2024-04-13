export interface IReqHandler<TReq, TRes> {
    handle(req: TReq): Promise<TRes>;
}