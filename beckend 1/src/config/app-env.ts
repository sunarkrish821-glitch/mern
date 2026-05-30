import { config } from "dotenv";
config()

export const MongodbConfig = {
  url: process.env.MONGODDB_URL,
  dbName: process.env.MONGODB_DB_NAME,
};

export const Secrets = {
  jwtSecret: process.env.JWT_SECRET
}

export const AppConfig = {
  assetUrl: process.env.ASSETS_URL,
};