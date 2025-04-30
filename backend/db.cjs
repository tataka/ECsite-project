const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 0 // ←　queueTimeout: 0　の代用として
});
module.exports = pool.promise();
