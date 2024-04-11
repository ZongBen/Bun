export class contractHelper<T> {
    key(key: keyof T): string {
        return key as string;
    }
}