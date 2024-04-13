export interface IJwTokenGenerator {
    generateToken(payload: object): string;
}