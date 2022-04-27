// View All Departments 
function viewDepartment() {
    connection.query('SELECT * FROM department', (err, data) => {
        if (error) throw error
        console.table(dept);
        //viewDepartment();
        employeeTracker();
    });
}
//View All Roles
function viewRoles() {
    connection.query('SELECT * FROM employee', (err, data) => { 
        if (error) throw error
        console.table(roles)
        employeeTracker();
    });
}
//View All Employees
function viewEmployees() {
    connection.query('SELECT * FROM employee', (err, data) => {
        if (error) throw error 
        console.table(employees)
        employeeTracker();
    });
}