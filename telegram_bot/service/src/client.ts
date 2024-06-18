const { Client } = require('pg');


const config = {
    user: 'username',
    password: 'password',
    host: 'host',
    port: 'port_number',
    database: 'database_name',
}

const client = new Client(config);

client
    .connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // Execute SQL queries here

        client.query('SELECT * FROM employees', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result:', result.rows);
            }

            // Close the connection when done
            client
                .end()
                .then(() => {
                    console.log('Connection to PostgreSQL closed');
                })
                .catch((err) => {
                    console.error('Error closing connection', err);
                });
        });
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });