const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const util = require("util");
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
    console.log(err);
    res.status(500);
    return res.send("There was an error with connecting.");
    console.log('You successfully connected!');

//Create a function to allow inquirer to prompt data
employeeTracker();
});

connection.query = util.promisfy(connection.query);

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
            'Remove An Employee',
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
            case "Add A Department":
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Add the department here: ',
                        validate: responses => {
                            if (responses !== "") {
                                return true;
                            } else {
                                console.log('Please enter the department you would like to add.');
                                return false;
                            }
                        },
                    },
                ]).then(responses => {
                    addDepartment(responses.department);
                    employeeTracker();
                })    

            //Start a new case "Add Role"    
            case "Add A Role":
                // const sql = 'SELECT * FROM department';
                // connection.query(sql, (err, results) => {
                //     if(err) throw(err);
                // })
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Please enter the title role.',
                        validate: responses => {
                            if (responses !== "") {
                                return true;
                            } else {
                                console.log('Please enter the title of the new role.');
                                return false
                            }
                        },
                    },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Please enter their salary.',
                        },

                        {
                            type: 'input',
                            name: 'department_id',
                            message: 'Please enter the department id.',
                        },
                    

                ]).then(responses => {
                    addRole(responses.title, responses.salary, responses.department_id);
                    employeeTracker();
                })

                break;

            //Start a new case
            case "Add An Employee":
                inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'Enter their first name here',
                        },

                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'Enter their last name here',
                        },

                        {
                            type: 'input',
                            name: 'role_id',
                            message: 'Please enter their title.',
                        },

                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'Please enter the manager id.',
                        },

                ]).then(responses => {
                    addEmployee(responses.first_name, responses.last_name, responses.role_id, responses.manager_id);
                    employeeTracker();
                })

                break;        
            
                case "Update an Employee's Role":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'manager',
                        message: "Please enter the Employee's role."
                    },

                    {
                        type: 'input',
                        name: 'id',
                        message: "Please enter the Employee's ID",
                    }
                ]).then(responses => {
                    updateEmployee(responses.manager, responses.id);
                    employeeTracker();
                })

                break;
        }


    });
}


employeeTracker()