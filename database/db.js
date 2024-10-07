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

// db.connect((err, client, release) => {
//   if (err) {
//     return console.error("Error acquiring client", err.stack);
//   }
//   console.log("Connected to the database!");
//   client.query("SELECT NOW()", (err, result) => {
//     release();

//     if (err) {
//       return console.error("Error executing query", err.stack);
//     }
//     console.log("Query result:", result.rows);
//   });
// });

module.exports = db;
