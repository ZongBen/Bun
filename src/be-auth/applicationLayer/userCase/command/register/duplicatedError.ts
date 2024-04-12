import { ErrorResponse } from "../../../../../be-common/applicationLib/errorResponse";

export class DuplicatedError extends ErrorResponse {
    message = 'account duplicated';
    statusCode = 400;
}