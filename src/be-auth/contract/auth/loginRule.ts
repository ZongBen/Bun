import { contractHelper } from '../../../be-common/contractLib/contractHelper';
import type { LoginReq } from './loginReq';

import { body } from "express-validator";

const req = new contractHelper<LoginReq>();

export const loginRule = [
    body(req.key('account')).notEmpty(),
    body(req.key('password')).notEmpty(),
    body(req.key('username')).notEmpty()
]