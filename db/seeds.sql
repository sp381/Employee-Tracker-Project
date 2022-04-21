USE employee_tracker;

INSERT INTO department(id, name)
VALUES 
(1, "HR"),
(2, "Management"),
(3, "Sales Dept");

INSERT INTO role(id, title, salary, deparment_id)
VALUES
(1, "HR Head Rep", 80000, 1),
(2, "HR Agent Rep", 70000, 1),
(3, "Manager", 85000, 2),
(4, "Assist Manager", 70000, 2),
(5, "Sales Rep", 100000, 3),
(6, "Sales Assistant", 65000, 3);



