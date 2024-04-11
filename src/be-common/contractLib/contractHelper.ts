export class ContractHelper<T> {

    private constructor() { }

    public static Create<T>() {
        return new ContractHelper<T>();
    }

    public key(key: keyof T): string {
        return key as string;
    }
}