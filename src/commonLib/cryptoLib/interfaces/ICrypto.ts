export interface ICrypto {
    Hashing(data: string): number|bigint
    toBase64(data: string): string
}