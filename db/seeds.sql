INSERT INTO department (department_name)
Values
    ('Sales'),
    ('Tech Support'),
    ('Security'),
    ('Customer Service');

INSERT INTO roles (title, salary, department_id)
Values
    ('Sales Representative', 75000, 1),
    ('Technical Analyst', 80000, 2),
    ('Security Specialist', 83000, 3),
    ('Customer Liason', 60000, 4),
    ('Manager', 90000, 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
Values
  ('Katherine', 'Mansfield', 1, 3),
  ('Dora', 'Carrington', 2, 1),
  ('Edward', 'Bellamy', 2, 1),
  ('Montague', 'Summers', 2, 3),
  ('Octavia', 'Butler', 2, 3),
  ('Unica', 'Zurn', 1, 2),
  ('James', 'Fraser', 3, 4),
  ('Jack', 'London', 3, 4),
  ('Robert', 'Bruce', 3, 1),
  ('Peter', 'Greenaway', 3, 3),
  ('Derek', 'Jarman', 1, 4),
  ('Paolo', 'Pasolini', 4, 5),
  ('Heathcote', 'Williams', 4, 3),
  ('Sandy', 'Powell', 4, 2),
  ('Emil', 'Zola', 4, 1),
  ('Sissy', 'Coalpits', 4, 3);

INSERT INTO manager (first_name, last_name, roles_id)
Values
  ('Sam', 'Sanchez', 5),
  ('Ally', 'Rodriguez', 5),
  ('James', 'Jimenez', 5),
  ('Anna', 'Herrera', 5),
  ('Yohan', 'Van', 5);
