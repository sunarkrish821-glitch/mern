import mongoose from "mongoose";
import { MongodbConfig } from "./app-env";

// Connect the db
(async () => {
  try {
    await mongoose.connect(MongodbConfig.url as string, {
      dbName: MongodbConfig.dbName, 
      autoCreate: true,
      autoIndex: true
    })
    console.log("**** Mongodb Connected Successfully ****")
  } catch(exception) {
    console.error("**** Error mongodb connection ****")
    process.exit(1)
  }
})();