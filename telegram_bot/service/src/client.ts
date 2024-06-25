
export {}
import { Client } from 'pg';


const config = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'postgres',
}

// const client = new Client(config);
//
// client
//     .connect()
//     // .then(() => {
//     //     console.log('Connected to PostgreSQL database');
//     //
//     //     // Execute SQL queries here
//     //
//     //     client.query('SELECT * FROM employees', (err, result) => {
//     //         if (err) {
//     //             console.error('Error executing query', err);
//     //         } else {
//     //             console.log('Query result:', result.rows);
//     //         }
//     //
//     //         // Close the connection when done
//     //         client
//     //             .end()
//     //             .then(() => {
//     //                 console.log('Connection to PostgreSQL closed');
//     //             })
//     //             .catch((err) => {
//     //                 console.error('Error closing connection', err);
//     //             });
//     //     });
//     // })
//     .catch((err) => {
//         console.error('Error connecting to PostgreSQL database', err);
//     });


const client = new Client(config);

export {client};