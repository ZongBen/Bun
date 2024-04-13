import { injectable } from "inversify";
import type { ICrypto } from "./interfaces/ICrypto";

@injectable()
export class Crypto implements ICrypto {
    public Hashing(data: string): number|bigint {
        return Bun.hash(data);
    }

    public toBase64(data: string): string {
        return btoa(data);
    }
}