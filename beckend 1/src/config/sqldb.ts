import { Sequelize } from "sequelize";
import { SQLConfig } from "./app-env";

const sequelize = new Sequelize(SQLConfig.url as string, {
  dialect: "postgres",
  database: SQLConfig.dbName,
  logging: true,
  dialectOptions: {

    ssl: {
      require: true, 
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

(async() => {
  try {
    await sequelize.authenticate()
    console.log("***** DB Connected successfully *****");
  } catch(exception) {
    console.error(exception)
    console.log("***** SQL Connection failed *****");
  }
})()


export default sequelize;