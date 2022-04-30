const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const util = require("util");
const connection = require("./db/connection");
const departments = [];
// Create a function to view, add and update information
function employeeTracker() {
  inquirer
    .prompt({
      type: "list",
      name: "choices",
      message: "Choose from the Following Options: ",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Remove An Employee",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then((responses) => {
      switch (responses.choices) {
        case "View All Departments":
          viewDepartment();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add A Department":
          addDept();
          break;

        case "Add A Role":
          addRole();
          break;

        case "Add An Employee":
          newEmp();
          break;

        case "Exit":
          console.log("whats wrong");
          connection.end();
          break;
      }
    });
}
// View All Departments
function viewDepartment() {
  connection.query("SELECT * FROM department", (error, data) => {
    if (error) throw error;
    console.table(data);
    //viewDepartment();
    employeeTracker();
  });
}
//View All Roles
function viewRoles() {
  connection.query("SELECT * FROM employee", (error, data) => {
    if (error) throw error;
    console.table(data);
    employeeTracker();
  });
}
//View All Employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", (error, data) => {
    if (error) throw error;
    console.table(employees);
    employeeTracker();
  });
}

//Add A New Department
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Add the new department here: ",
        validate: (responses) => {
          if (data) {
            return true;
          } else {
            console.log("Please enter the new department name.");
          }
        },
      },
    ])
    .then((responses) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: responses.department,
        },
        (error) => {
          if (error) throw error;
          console.log(`New Department ${responses.department} added!`);
          employeeTracker();
        }
      );
    });
}

//Add An Employee
function addEmployee(first_name, last_name, department, manager) {
  const sql = "SELECT * FROM employee, role";
  connection.query(sql, (error, results) => {
    if (error) throw error;

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Please enter the employee's first name",
        },

        {
          type: "input",
          name: "last_name",
          message: "Please enter the employee's last name",
        },

        {
          type: "input",
          name: "role_id",
          message: "Please enter the Employee's role ID",
        },

        {
          type: "input",
          name: "manager_id",
          message: "Please enter the empployee's manager id",
        },
      ])
      .then((responses) => {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            name: responses.employee,
          },
          (error) => {
            if (error) throw error;
            console.log("New employee ${responses.employee} added!");
            employeeTracker();
          }
        );
      });
  });
}

function addRole(title, salary, department_id) {
  console.log("add role");
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Please enter the title of the new role",
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("Please enter the title of role");
          }
        },
      },

      {
        type: "input",
        name: "salary",
        message: "What is their salary?",
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("Please enter salary");
          }
        },
      },

      {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: departments,
        validate: (responses) => {
          if (responses) {
            return true;
          } else {
            console.log("Which dept");
          }
        },
      },

    ])
    .then((responses) => {
      connection.query(
        `INSERT INTO role SET ?`,
        {
          role: responses.role,
          salary: responses.salary,
          department: responses.department,
        },
        (error) => {
          if (error) throw error;
          console.log("New role ${responses.role} added!");
          employeeTracker();
        }
      );
    });
}

//Update Employee Information
function updateEmployee(employeeRole, employeeId) {
  var updateRole = connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [employeeRole, employeeId],
    function (error, role) {
      if (err) throw err;
    }
  );
  updateEmployee();
}

// View All Departments
function viewDepartment() {
  connection.query("SELECT * FROM department", (error, data) => {
    if (error) throw error;
    console.table(data);
    //viewDepartment();
    employeeTracker();
  });
}
//View All Roles
function viewRoles() {
  connection.query("SELECT * FROM employee", (error, data) => {
    if (error) throw error;
    console.table(data);
    employeeTracker();
  });
}
//View All Employees
function viewEmployees() {
  connection.query("SELECT * FROM employee", (error, data) => {
    if (error) throw error;
    console.table(data);
    employeeTracker();
  });
}
function populate() {
  departments.length = 0;
  connection.query("SELECT name FROM department", (error, data) => {
    if (error) throw error;
    for (let i = 0; i < data.length; i++) {
      departments.push(data[i].name);
    }
    console.log(departments);
  });
}
populate();
employeeTracker();
