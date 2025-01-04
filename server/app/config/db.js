const { Pool } = require('pg');
require('dotenv').config();

let pool;

if (process.env.NODE_ENV !== 'test') {
    // Hanya buat koneksi ke database jika bukan di mode 'test'
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_NAME:', process.env.DB_NAME);

    pool.connect()
    .then(client => {
        console.log('Connected to the database successfully');
        // Set timezone for this session
        return client.query("SET timezone = 'Asia/Jakarta';")
            .then(() => {
                client.release();
                console.log('Timezone has been set to Asia/Jakarta');
            })
            .catch(err => {
                client.release();
                console.error('Error setting timezone:', err.stack);
            });
    })
    .catch(err => {
        console.error('Database connection error:', err.stack);
    });
}

module.exports = pool;
