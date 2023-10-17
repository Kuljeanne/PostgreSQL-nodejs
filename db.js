const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '987654321',
  host: 'localhost',
  port: '5432',
  database: 'users',
});

module.exports = pool
