import { ErrorResponse } from "../../../../../be-common/applicationLib/errorResponse";

export class LoginError extends ErrorResponse {
    message = 'login failed';
    statusCode = 400;
}