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
        type: 'list',
        name: 'Choices',
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
    }).then(responses => {
        switch (responses.action) {
            case 'View All Departments':
                viewDepartment();
                employeeTracker();
                break;
        
            case 'View All Roles':
                viewRoles();
                employeeTracker();
                break;

            case 'View All Employees':
                viewEmployees();
                employeeTracker();
                break; 

            // Start new case "Add Department"
            case 'Add A Department':
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Add the department here: ',
                        validate: responses => {
                            if (responses) {
                                return true;
                            } else {
                                console.log('Please enter the department you would like to add.');
                                return false;
                            }
                        },
                    },
                ]).then(answers => {
                    addDepartment(answers.Department);
                    employeeTracker();
                })
                break;  
            //Start a new case "Add Role"    
            case 'Add A Role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Please enter the title role.'
                        validate: responses => {
                            if (responses) {
                                return true;
                            } else {
                                console.log('Please enter the title of the new role.');
                                return false
                            }
                        }

                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Please enter their salary.',
                        },

                        {
                            type: 'input',
                            name: 'department_id',
                            message: 'Please enter the department id.',
                        }
                    }

                ]).then(responses => {
                    addRole(responses.title, responses.salary, responses.department_id);
                    employeeTracker();
                })
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
employeeTracker()