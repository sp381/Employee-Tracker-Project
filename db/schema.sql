DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
   id INT AUTO_INCREMENT PRIMARY KEY,  
   name VARCHAR(30)
); 

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2) NOT NULL,
    deparment_id INT,
    FOREIGN KEY (deparment_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT, 
    PRIMARY(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL 
);


