export interface ISender {
    send<TRes>(req: any): Promise<TRes>
}