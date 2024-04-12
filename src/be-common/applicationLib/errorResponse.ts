export abstract class ErrorResponse {
    abstract readonly message: string;
    abstract readonly statusCode: number;
}