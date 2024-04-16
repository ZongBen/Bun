import type { Result, ValidationError } from "express-validator";

export const validErrorHandler = (errors: Result<ValidationError>) => {
    return errors.array().map((error) => {
        return error.msg;
    });
}