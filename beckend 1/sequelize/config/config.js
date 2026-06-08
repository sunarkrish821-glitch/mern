require("dotenv").config()

module.exports = {
  development: {
    url: process.env.SQL_DB_URL,
    // host
    // user
    // pass
    // dbName
    // port
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  },
  test: {
    url: process.env.SQL_DB_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  },
  production: {
    url: process.env.SQL_DB_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
}