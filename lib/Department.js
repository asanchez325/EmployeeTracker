const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require("../db/database");
const inquirer = ('inquirer');

viewDepartments = () => {
    console.log("All Departments");
    const sql = connection.query(`SELECT department.id, department.name AS department 
    FROM department
    ORDER BY department`, function(err, res) {
        if(err) throw err;
        console.table(res);
       
    });
  }
  
  addDepartment = (department) => {
    connection.query(`INSERT INTO department SET ?`, department, (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    });
 
  }
  
  
  deleteDepartment = () => {
    console.log("Delete a department");
    connection.query(`DELETE FROM department WHERE department.id = ?`, [4], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      
    });
  }
 
  
  updateDepartment = () => {
    connection.query(`UPDATE department  SET  name = ? WHERE id = ?`, 
    ['Data Systems', 3], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
      
    });
  }
  
  module.exports = {
      viewDepartments, 
      updateDepartment,
      deleteDepartment, 
      addDepartment
};