const connection = require("./db/database")
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");



const welcome = function() {
  inquirer
  .prompt({
      type: "list",
      name: "welcome",
      message: "Welcome to the Employee Tracker Database! Where would you like to start?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a New Department",
        "Add a New Role",
        "Add a New Employee",
        "Edit an Existing Department",
        "Edit an Existing Role",
        "Edit an Existing Employee",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee"
        ]
      })
  
    .then(function(answer) {
      console.log(answer);
      switch (answer.welcome) {
        case "View All Departments":
          viewAllDepartments ();
        case "View All Roles":
          viewAllRoles ();
        case "View All Employees":
          viewAllEmployees ();
        break;
        case "Add a New Department": 
           AddNewDepartments();
        break;
        case "Add a New Role":
          AddNewRoles();
        break;
        case "Add a New Employee":
          AddNewEmployee();
        break;
        case "Edit an Existing Department":
          editDepartment();
        case "Edit an Existing Role":
          editRoles();
        case "Edit an Existing Employee":
          editEmployee();
          break;
          case "Delete a Department":
            deleteDepartment();
            break;
          case "Delete a Role":
            deleteRoles();
            break;
        case "Delete an Employee":
          deleteEmployee();
          break;
      }
      });
    };
    welcome();

//VIEW ALL
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function(err, answer) {
    console.log("\n Departments Retrieved from Database \n");
    console.table(answer);
  });
  welcome();
}

function viewAllRoles() {
  connection.query("SELECT * FROM roles", function(err, answer) {
    console.log("\n Departments Retrieved from Database \n");
    console.table(answer);
  });
  welcome();
}
function viewAllEmployees() {
  connection.query("SELECT * FROM department", function(err, answer) {
    console.log("\n Departments Retrieved from Database \n");
    console.table(answer);
  });
  welcome();
}

//ADD NEW

function AddNewDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the New Department Name:",
        department_name: "name"
      },
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: answer.name,
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      welcome();
    });
}

function AddNewRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        title: "title"
      },
      {
        type: "input",
        message: "Enter employee last name",
        salary: "int"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          title: answer.title,
          salary: answer.int,
          department_id: null,
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      welcome();
    });
}


function AddNewEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        first_name: "firstname"
      },
      {
        type: "input",
        message: "Enter employee last name",
        last_name: "lastname"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: null,
          manager_id: null
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      welcome();
    });
}

//UPDATE

// grabs all employees (id, first name, last name) and then allows user to select employee to update role
// https://www.guru99.com/delete-and-update.html
function editEmployee() {
  let allemp = [];
  connection.query("SELECT * FROM employee", function(err, answer) {
    // console.log(answer);
    for (let i = 0; i < answer.length; i++) {
      let employeeString =
        answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
      allemp.push(employeeString);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmpRole",
          message: "select employee to update role",
          choices: allemp
        },
        {
          type: "list",
          message: "select new role",
          choices: ["Sales Representative", "Technical Analyst", "Security Specialist", "Customer Service", "Manager"],
          name: "newrole"
        }
      ])
      .then(function(answer) {
        console.log("about to update", answer);
        const idToUpdate = {};
        idToUpdate.employeeId = parseInt(answer.editEmployee.split(" ")[0]);
        if (answer.newrole === "manager") {
          idToUpdate.role_id = 1;
        } else if (answer.newrole === "employee") {
          idToUpdate.role_id = 2;
        }
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [idToUpdate.role_id, idToUpdate.employeeId],
          function(err, data) {
            welcome();
          }
        );
      });
  });
}

//DELETE