export interface IMediator {
    send<TRes>(req: any): Promise<TRes>;
}