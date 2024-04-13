import { injectable } from "inversify";
import type { IMediatorMap } from "./interfaces/IMediatorMap";

@injectable()
export abstract class MediatorMap implements IMediatorMap {
    protected _map = new Map();

    public set(key: any, value: any) {
        this._map.set(key, value);
    }

    public get(key: any) {
        return this._map.get(key);
    }
}