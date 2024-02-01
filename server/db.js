const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Proxiad2024*!'
});

module.exports = pool;