import { body } from "express-validator";
import { ContractHelper } from "../../../../commonLib/contractLib/contractHelper";
import type { RegisterReq } from "./registerReq";


const rule = ContractHelper.Create<RegisterReq>();

export const registerRule = [
    body(rule.key('account'))
        .notEmpty().withMessage('account is required')
        .isString().withMessage('account must be string'),

    body(rule.key('password'))
        .notEmpty().withMessage('password is required')
        .isString().withMessage('password must be string'),

    body(rule.key('userName'))
        .notEmpty().withMessage('userName is required')
        .isString().withMessage('userName must be string')
]