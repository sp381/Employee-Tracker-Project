USE employee_tracker;

INSERT INTO department(id, name)
VALUES 
(1, "HR"),
(2, "Management"),
(3, "Sales Dept");

INSERT INTO role(id, title, salary, deparment_id)
VALUES
(1, "HR Head Rep", 80000, 1),
(2, "Customer Service", 50000, 1),
(3, "Manager", 85000, 2),
(4, "Assist to the Regional Manager", 60000, 2),
(5, "Sales Rep", 100000, 3),
(6, "Sales Assistant", 65000, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Toby", "Flenderson", 1, NULL),
(2, "Kelly", "Kapoor", 2, 3),
(3, "Michael", "Scott", 2, 1),
(4, "Dwight", "Schrute", 2, 2);
(5, "Jim", "Halpert", 3, 2)
