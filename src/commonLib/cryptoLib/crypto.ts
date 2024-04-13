import { injectable } from "inversify";
import type { ICrypto } from "./interfaces/ICrypto";

@injectable()
export class Crypto implements ICrypto {
    Hashing(data: string): number | bigint {
        return Bun.hash(data);
    }

    toBase64(data: string): string {
        return btoa(data);
    }
}