require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function queryDatabase(sqlQuery, values) {
    let connection;
    try {
        if (!client._connected) {
            connection = await client.connect();
        }

        if (sqlQuery) {
            try {
                const result = await client.query(sqlQuery, values);
                return result.rows;
            } catch (err) {
                console.error("Database query error:", err);
                throw err;
            }
        } else {
            return connection;
        }
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    } finally {
        try {
            if (connection) {
                await connection.release();
            }
            // console.log("Database pool has been released");
        } catch (err) {
            console.error("Error releasing database pool:", err);
        }
    }
}

async function closeDatabasePool() {
  await client.end();
  console.log("Database pool has been closed");
}

module.exports = {
  queryDatabase,
  closeDatabasePool,
};
