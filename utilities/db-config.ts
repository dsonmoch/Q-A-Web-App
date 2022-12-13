import * as dotenv from "dotenv";
import * as mysql from "mysql2";

dotenv.config();

const poolConnection = mysql.createPool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,

});


const queryExecuter = (sqlQuery: any, params: any) => {
  const queryStatement = mysql.format(sqlQuery, params);
  return new Promise(async (resolve, reject) => {
    poolConnection.getConnection((err, connection) => {
      if (err) throw err;
      console.log("connected as id " + connection.threadId);
      if (sqlQuery) {
        connection.query(queryStatement, (err, result) => {
          connection.release();
          if (err) throw err;
          return resolve(result);
        });
      }
    });
  });
};

export default queryExecuter;
