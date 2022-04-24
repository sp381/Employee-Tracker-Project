USE employee_tracker;

INSERT INTO department(id, name)
VALUES 
("HR"),
("Management"),
("Sales Dept");

INSERT INTO role(title, salary, deparment_id)
VALUES
("HR Head Rep", 80000, 1),
("Customer Service", 50000, 1),
("Manager", 85000, 2),
("Assist to the Regional Manager", 60000, 2),
("Sales Rep", 100000, 3),
("Sales Assistant", 65000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Toby", "Flenderson", 1, NULL),
("Kelly", "Kapoor", 2, 3),
("Michael", "Scott", 2, 1),
("Dwight", "Schrute", 2, 2);
("Jim", "Halpert", 3, 2)
