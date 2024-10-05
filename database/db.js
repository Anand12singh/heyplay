const pg = require("pg").Pool;
require("dotenv").config();

const dbConfig = {
  user: process.env.USERNAMES,
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  database: process.env.DATABASE,
  password: process.env.PAASWORDS,
};
const db = new pg(dbConfig);
console.log(`Database: ${dbConfig.database}`);
console.log(`Hostname: ${dbConfig.host}`);
console.log(`Port: ${dbConfig.port}`);
console.log(`Password: ${dbConfig.password}`);
console.log(`Username: ${dbConfig.user}`);
module.exports = db;
