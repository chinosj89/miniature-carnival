-- Insert departments into the database
INSERT INTO department (name) VALUES
('Sales'), -- ID is 1 
('Engineering'), -- ID is 2
('Finance'), -- ID is 3
('Legal'); -- ID is 4

-- Insert roles given into the database
INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, 1), -- 'Sales Lead' is associated with the 'Sales' department (department_id = 1)
('Salesperson', 80000, 1), -- 'Salesperson' is also associated with the 'Sales' department (department_id = 1)
('Lead Engineer', 150000, 2), -- 'Lead Engineer' is associated with the 'Engineering' department (department_id = 2)
('Software Engineer', 120000, 2), -- 'Software Engineer' is also associated with the 'Engineering' department (department_id = 2)
('Account Manager', 160000, 3), -- 'Account Manager' is associated with the 'Finance' department (department_id = 3)
('Accountant', 125000, 3), -- 'Accountant' is also associated with the 'Finance' department (department_id = 3)
('Legal Team Lead', 250000, 4), -- 'Legal Team Lead' is associated with the 'Legal' department (department_id = 4)
('Lawyer', 190000, 4); -- 'Lawyer' is also associated with the 'Legal' department (department_id = 4)



-- Insert employees into the database
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),  -- John has a role_id of 1 and is a manager = NULL
('Mike', 'Chan', 2, 1),  -- Mike has a role_id of 2 and his manager is John, whose role_id is 1
('Ashley', 'Rodriguez', 3, NULL),  -- Ashley has a role_id of 3 and is a manager = NULL
('Kevin', 'Tupik', 4, 3),  -- Kevin has a role_id of 4 and his manager is Ashley, whose role_id is 3
('Kunal', 'Singh', 5, NULL),  -- Kunal has a role_id of 5 and is a manager = NULL
('Malia', 'Brown', 6, 5),  -- Malia has a role_id of 6 and her manager is Kunal, whose role_id is 5
('Sarah', 'Lourd', 7, NULL);  -- Sarah has

