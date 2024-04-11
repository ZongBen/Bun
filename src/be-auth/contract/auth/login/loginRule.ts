import { contractHelper } from '../../../../be-common/contractLib/contractHelper';
import type { LoginReq } from './loginReq';
import { body } from "express-validator";

const req = new contractHelper<LoginReq>();

export const loginRule = [
    body(req.key('account'))
        .notEmpty().withMessage('account is required')
        .isString().withMessage('account must be string'),

    body(req.key('password'))
        .notEmpty().withMessage('password is required')
        .isString().withMessage('password must be string'),

    body(req.key('username'))
        .notEmpty().withMessage('username is required')
        .isString().withMessage('username must be string'),
]