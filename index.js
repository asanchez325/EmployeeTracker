const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "KnoxFox#25",
  database: "tracker_db"
})

const welcome = function() {
  inquirer
  .prompt({
      type: "list",
      name: "welcome",
      message: "Welcome to the Employee Tracker Database! Where would you like to start?",
      choices: [
        "Employees",
        "Roles",
        "Departments"
      ]
    })

  .then(function(answer) {
    console.log(answer);
    switch (answer.welcome) {
      case "Employees":
      viewEmployees ();
      break;
      case "Roles":
      viewRoles();
      break;
      case "Departments":
        viewDepartments();
        break;
    }
    });
  };
  welcome();

  
