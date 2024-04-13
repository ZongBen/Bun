import { ErrorResponse } from "../../../../../commonLib/applicationLib/errorResponse";

export class DuplicatedError extends ErrorResponse {
    message = 'account duplicated';
    statusCode = 400;
}