import { ErrorResponse } from "../../../../../commonLib/applicationLib/errorResponse";

export class LoginError extends ErrorResponse {
    message = 'login failed';
    statusCode = 400;
}