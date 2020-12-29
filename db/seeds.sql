INSERT INTO department (department_name)
Values
    ('Sales'),
    ('Tech Support'),
    ('Security'),
    ('Customer Service');
;

INSERT INTO roles (title, salary, department_id)
Values
    ('Sales Representative', '75,000', 1),
    ('Technical Analyst', '80,000', 2),
    ('Security Specialist', '83,000', 3),
    ('Customer Liason', '60,000' , 4),
    ('Manager', '90,000', 1),
    ('Manager', '90,000', 2),
    ('Manager', '90,000', 3),
    ('Manager', '90,000', 4);

;

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 5, 3),
  ('Virginia', 'Woolf', 1, 5),
  ('Piers', 'Gaveston', 1, 5),
  ('Charles', 'LeRoi', 1, 5),
  ('Katherine', 'Mansfield', 1, 5),
  ('Dora', 'Carrington', 2, 6),
  ('Edward', 'Bellamy', 2, 6),
  ('Montague', 'Summers', 2, 6),
  ('Octavia', 'Butler', 2, 6),
  ('Unica', 'Zurn', 7, 9),
  ('James', 'Fraser', 3, 7),
  ('Jack', 'London', 3, 7),
  ('Robert', 'Bruce', 3, 7),
  ('Peter', 'Greenaway', 3, 7),
  ('Derek', 'Jarman', 8, 3),
  ('Paolo', 'Pasolini', 4, 8),
  ('Heathcote', 'Williams', 4, 8),
  ('Sandy', 'Powell', 4, 8),
  ('Emil', 'Zola', 4, 8),
  ('Sissy', 'Coalpits', 4, 8);

  ;