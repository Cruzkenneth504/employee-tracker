
-- Departments seed data
INSERT INTO departments (department_name) VALUES
  ('Web Development'),
  ('Graphic Desing'),
  ('Marketing');
  ('Nutrition')

-- Roles seed data
INSERT INTO roles (title_name, salary_decimal, department_id) VALUES
  ('Web Developer Manager', 250000.00, 1),
  ('Senior Developer ', 150000.00, 1),
  ('Graphic Desing Manager', 80000.00, 2),
  ('Senior Designer', 60000.00, 2),
  ('Marketing Manager', 120000.00, 3),
  ('Marketing Specialist', 90000.00, 3),
  ('Nutrition Manager', 110000.00, 4);
  ('Nutrition Specialist', 90000.00, 4)
-- Employees seed data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Ken', 'Cruz', 1, 1,)
  ('Kenit', 'Rod', 1, NULL),
  ('Kenny', 'O', 2, 2),
  ('Kencito', 'Rodriguez', 2, NULL),
  ('Kenyth', 'Fuentes',3, 3),
  ('Quenet', 'Dubon', 3, NULL),
  ('Kenneith', 'Reyes'4, 4),
  ('Kenneth', 'Cruz', 4, NULL);
  

