import { ContractHelper } from '../../../../commonLib/contractLib/contractHelper';
import type { LoginReq } from './loginReq';
import { body } from "express-validator";

const req = ContractHelper.Create<LoginReq>();

export const loginRule = [
    body(req.key('account'))
        .notEmpty().withMessage('account is required')
        .isString().withMessage('account must be string'),

    body(req.key('password'))
        .notEmpty().withMessage('password is required')
        .isString().withMessage('password must be string')
]