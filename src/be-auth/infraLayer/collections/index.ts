import type { IMongoSchema } from "../../../be-common/mongoLib/interfaces/IMongoSchema";
import { UserSchema } from "./user";

export const schemas: IMongoSchema[] = [
    new UserSchema()
];