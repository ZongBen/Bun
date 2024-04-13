import type { IMongoSchema } from "../../../commonLib/mongoLib/interfaces/IMongoSchema";
import { UserSchema } from "./user";

export const schemas: IMongoSchema[] = [
    new UserSchema()
];