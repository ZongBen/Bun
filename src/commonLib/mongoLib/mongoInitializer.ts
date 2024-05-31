import mongoose from "mongoose";
import { inject, injectable } from "inversify";
import type { IMongoInitializer } from "./interfaces/IMongoInitializer";
import { MONGO_TYPES } from "./types";
import type { IMongoSchema } from "./interfaces/IMongoSchema";


@injectable()
export class MongoInitializer implements IMongoInitializer {
   private readonly _db: mongoose.Connection;

   constructor(
      @inject(MONGO_TYPES.MongoConnectString) connStr: string
   ) {
      mongoose.connect(connStr);
      this._db = mongoose.connection;
      console.log(`connect to db ${connStr}`)
   }

   regisModel(schemas: IMongoSchema[]) {
      schemas.forEach((schema) => {
         this._db.model(schema.colName, schema.schema);
         console.log(`register schema ${schema.colName}`);
      });
   }

   getDb() {
      return this._db;
   }
}
