const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Get all employees and their roles affiliation
router.get('/employee', (req, res) => {
  const sql =  `SELECT employee.*, roles.title 
                AS roles_title 
                FROM employee
                LEFT JOIN roles
                ON employee.roles_id = roles.id`;
                `SELECT employee.*, employee.first_name 
                AS employee_first_name
                FROM employee 
                LEFT JOIN employee 
                ON employee.manager_id = employee.id 
                WHERE employee.id = ?`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get single employee with roles affliliation
router.get('/employee/:id', (req, res) => {
  const sql = `SELECT employee.*, roles.title 
               AS roles_title
               FROM employee 
               LEFT JOIN roles 
               ON employee.roles_id = roles.id 
               WHERE employee.id = ?`;
               `SELECT employee.*, manager.name 
               AS employee_manager
               FROM employee 
               LEFT JOIN employee 
               ON employee.manager_id = employee.id 
               WHERE employee.id = ?`;

  const params = [req.params.id];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Create a employee
router.post('/employee', ({ body }, res) => {
  // employee is allowed to have no role affiliation
  const errors = inputCheck(body, 'first_name', 'last_name', 'manager_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.roles_id, body.manager_id];
  // function,not arrow, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: body,
      id: this.lastID
    });
  });
});

// Update a employee roles
router.put('/employee/:id', (req, res) => {
  // Data validation 
  const errors = inputCheck(req.body, 'roles_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
  const params = [req.body.roles_id, req.params.id];
  // function,not arrow, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: req.body,
      id: this.lastID
    });
  });
});

// Delete a employee
router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: 'deleted', changes: this.changes });
  });
});

module.exports = router;