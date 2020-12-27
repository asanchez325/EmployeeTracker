const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Get all roles and their department affiliation
router.get('/roles', (req, res) => {
  const sql =  `SELECT roles.*, department.name 
                AS department_name 
                FROM roles 
                LEFT JOIN department 
                ON roles.department_id = department.id`;
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

// Get single role with department affliliation
router.get('/roles/:id', (req, res) => {
  const sql = `SELECT roles.*, department.name 
               AS department_name 
               FROM roles 
               LEFT JOIN department 
               ON roles.department_id = department.id 
               WHERE roles.id = ?`;
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

// Create a role
router.post('/roles', ({ body }, res) => {
  // Roles is allowed to have no department affiliation
  const errors = inputCheck(body, 'title', 'salary');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];
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

// Update a roles's department
router.put('/roles/:id', (req, res) => {
  // Data validation 
  const errors = inputCheck(req.body, 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE roles SET department_id = ? WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];
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

// Delete a role
router.delete('/roles/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
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