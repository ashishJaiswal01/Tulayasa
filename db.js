import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
});

console.log('DB host:', process.env.DB_CONNECTION_STRING);

export async function testDb() {
  await pool.query('SELECT 1');
}
