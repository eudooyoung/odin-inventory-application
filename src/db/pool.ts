import pg = require("pg");
import fs = require("node:fs");

let pool: pg.Pool;
if (process.argv[2] === "local") {
  pool = new pg.Pool({
    connectionString: process.env.LOCAL_DB_URL,
  });
} else {
  pool = new pg.Pool({
    user: process.env.REMOTE_DB_USER,
    password: process.env.REMOTE_DB_PW,
    host: process.env.REMOTE_DB_HOST,
    port: Number(process.env.REMOTE_DB_PORT),
    database: process.env.REMOTE_DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync("./ca.pem").toString(),
    },
  });
}

export = pool;
