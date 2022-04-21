const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    if(err) throw err;
    console.log('you are successful!');
});

// Create a function to view, add and update information
function employeeTracker() { 
    inquirer.prompt({
        name: 'Choices',
        type: 'list',
        message: 'Choose from the Following Options: ',
        choices: [
            'View All Departments',
            'View All Roles', 
            'View All Employees', 
            'Add A Department',
            'Add A Role',
            'Add An Employee', 
            'Update an Employee Role',
            'Exit'
        ]
    }).then(answers => {
        switch (answers.action) {
            case 'View All Departments':
                viewDepartments();
                break;
        
            case 'View All Roles':
                viewRoles();
                break;

            case 'View All Employees':
                viewEmployees();
                break; 

            case 'Add A Department':
                addDepartment();
                break;  
                
            case 'Add A Role':
                addRole();
                break;
            
            case 'Add An Employee':
                addEmployee();
                break;        
            
            case 'Update an Employee Role':
                updateEmployee();
                break;
        }
    });
}
