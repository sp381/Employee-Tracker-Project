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
});

//connection.query = util.promisfy(connection.query);

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
                break;
        
            case 'View All Roles':
                viewRoles();
                break;

            case 'View All Employees':
                viewEmployees();
                break; 

            case 'Add New Department':
                addDept();
                break;
            
            case 'Add New Role':
                addRole();
                break    
            
            case 'Add New Employee':
                newEmp();
                break;
            
            case 'Exit Program':
                connection.end();
                break;
    };
},

// View All Departments 
function viewDept() {
    connection.query('SELECT * FROM department', (err, data) => {
        if (error) throw error
        console.table(dept);
        employeeTracker();
    });
},
//View All Roles
function viewRoles() {
    connection.query('SELECT * FROM employee', (err, data) => { 
            if (error) throw error
            console.table(roles)
            employeeTracker();
    });
},
//View All Employees
function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (error) throw error 
        console.table(employees)
        employeeTracker();
    });
},

// function updateEmployee(employeeRole, employeeId) {
//     var changeUp = connection.query(
//         "UPDATE employee SET manager_id = ? WHERE id = ?",
//         [employeeRole, employeeId],
//         function (err, update) {
//             if (err) throw err
//             console.table(changeUp)
//         })
// }

//Add A New Department
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Add the new department here: ',
            validate: responses => {
                if (data) {
                    return true;
                } else {
                    console.log('Please enter the new department name.');
                }
            }
        }
    ]).then(responses => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: responses.department
            },
            (error) => {
                if (err) throw err;
                console.log('New Department ${responses.department} added!');
                employeeTracker();  
            }
        )
    });
},

//Add An Employee
function addEmployee(first_name, last_name, department, manager) {
    const sql = 'SELECT * FROM employee, role';
    connection.query(sql, (err, results) => {
        if (error) throw error;
    
        inquirer.prompt([

        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the employee's first name",
        },

        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the employee's last name",
        },

        {
            type: 'input',
            name: 'role_id',
            message: "Please enter the Employee's role ID",
        },

        {
            type: 'input',
            name: 'manager_id',
            message: "Please enter the empployee's manager id",
        },
    ]).then(responses => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                name: responses.employee
            },
            (error) => {
                if (err) throw err;
                console.log('New employee ${responses.employee} added!');
                employeeTracker();
            }
        )
    });
})
});

function addRole (title, salary, department_id) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Please enter the title of the new role',
            validate: responses => {
                if (responses) {
                    return true;
                } else {
                    console.log('Please enter the title of role');
                }
            }
        },

        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?',
            validate: responses => {
                if (responses) {
                    return true;
                } else {
                    console.log('Please enter salary');
                }
            },
        }
    ])
    // var newRole = connection.query(
    //     "INSERT INTO role SET title =?, salary = ?, department_id =?",
    //     [title, salary, department_id],
    //     function (err, newRole) {
    //         if (err) throw err
    //     })
    viewRole();
}

    //Update Employee Information
    function updateEmployee (employeeRole, employeeId) {
        var updateRole = connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [employeeRole, employeeId],
            function (error, role) {
                if (err) throw err
            })
    viewDepartment();
    }
}
employeeTracker();