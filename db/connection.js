const mysql = require('mysql2');
const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3001,
        user: "root",
        password: "root",
        database: "employee_tracker",
    },
);

connection.connect((err) => {
    console.log('sdf');
    if(err) throw err;
    console.log(err);
    res.status(500);
    return res.send("There was an error with connecting.");
});

module.exports = connection 