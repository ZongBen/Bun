import type { IMongoSchema } from "../../../be-common/mongoLib/interfaces/IMongoSchema";
import { User } from "./user";

export const schemas: IMongoSchema[] = [
    new User()
];