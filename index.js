const connection = require("./db/database");
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const viewDepartments = require("./lib/Department");

//Welcome!
connection.connect(err => {
    if (err) throw err;
  });
  if(connection) {
  console.log("database connected");
  }
  console.log("Welcome to the Employee Management System!")
    return inquirer
    .prompt ([
        {
            type: "list",
            message: "Where would you like to start?",
            name: "welcome",
            choices: [
                "Departments",
                "Roles",
                "Employees"]
            }
            ])
        .then(function(userInput) {
            if(userInput.departments === "Departments") {
                return promptDepartments();
            }
            if(userInput.roles === "Roles") {
                return prompRoles();
            }
            if(userInput.employees === "Employees") {
                return promptEmployees();
           }else {
                console.log ("Goodbye");
                process.exit ();
        }
    

//Departments
    promptDepartments = () =>
    console.log("Welcome to Departments!")
        return inquirer
            .prompt ([
    {
        type: "list",
        message: "What would you like to do with Departments?",
        name: "department",
        choices: [
            "View all Departments",
            "Add New Department",
            "Delete Department",
            "Update Existing Department",
            "Return to Menu"]
        }
        ])
    .then(function(userInput) {
        if(userInput.departments === "View All Departments") {
            return viewDepartments();
        }
        if(userInput.roles === "Add New Department") {
            return addDepartment();
        }
        if(userInput.employees === "Update Existing Department") {
            return updateDepartment();
        }
        if(userInput.employees === "Delete Department") {
            return deleteDepartment();
       }else {
        return promtMenu(teamData);
    }})})
