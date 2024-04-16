import { injectable } from "inversify";
import type { IMediatorMap } from "./interfaces/IMediatorMap";
import type { IReq } from "./interfaces/IReq";
import type { IReqHandler } from "./interfaces/IReqHandler";

@injectable()
export abstract class MediatorMap implements IMediatorMap {

    private _map = new Map();

    set<TKey extends IReq<TRes>, TRes>(key: new (...args: any[]) => IReq<TRes>, value: new (...args: any[]) => IReqHandler<TKey, TRes>): void {
        this._map.set(key, value);
    }
    get<TKey extends IReq<TRes>, TRes>(key: new (...args: any[]) => IReq<TRes>): new (...args: any[]) => IReqHandler<TKey, TRes> {
        return this._map.get(key);
    }
}