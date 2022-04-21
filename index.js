const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "root",
        database: "employee_tracker",
    },
);

connection.connect((err) => {
    if(err) throw err;
    console.log('you are successful!');
});


