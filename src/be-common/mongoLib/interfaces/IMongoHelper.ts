import type { IMongoClient } from "./IMongoClient";
import type { IMongoInitializer } from "./IMongoInitializer";

export interface IMongoHelper extends IMongoClient, IMongoInitializer {
}