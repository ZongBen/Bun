export class ContractHelper<T> {

    private constructor() { }

    static Create<T>() {
        return new ContractHelper<T>();
    }

    key(key: keyof T): string {
        return key as string;
    }
}