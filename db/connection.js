const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "employee_tracker",
    },
);

connection.connect((err) => {
    console.log('sdf');
    if(err) throw err;
});

module.exports = connection 