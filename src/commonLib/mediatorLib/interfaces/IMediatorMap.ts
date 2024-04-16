import type { IReqHandler } from './IReqHandler';
import { _args } from '../../bootstrapLib/app.args';
import type { IReq } from './IReq';
export interface IMediatorMap {
    set<TKey extends IReq<TRes>, TRes>(key: new(...args: any[]) => IReq<TRes>, value: new(...args: any[]) => IReqHandler<TKey, TRes>): void;
    get<TKey extends IReq<TRes>, TRes>(key: IReq<TRes>): new(...args: any[]) => IReqHandler<TKey, TRes>;
}