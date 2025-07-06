require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false 
  },
  connectionTimeoutMillis: 5000 
});


(async () => {
  try {
    const client = await pool.connect();
    console.log('DB Connected Successfully');  
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.stack);
  }
})();

// Handle unexpected pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected pool error:', err.stack);
});

module.exports = { pool };