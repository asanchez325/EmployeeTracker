const inquirer = require ('inquirer');
const viewDepartment = require('./routes/apiRoutes/departmentRoutes');
const viewRoles = require('./routes/apiRoutes/rolesRoutes');
const viewEmployee = require('./routes/apiRoutes/employeeRoutes');
const sqlite3 = require('sqlite3').verbose();

// Connect to database 
const Connect = new sqlite3.Database('./db/tracker.db', err => {
  if (err) {
    return console.error(err.message);
  } else console.log('Connected to the Employee Tracker Database.'); 
    return promptTracker();
});



//Prompt user to select choice
const promptTracker = () => {
    console.log("Welcome to the Employee Tracker?");  
    return inquirer
    .prompt ([
        {
            type: "list",
            message: "What would you like to do in the Employee Tracker?",
            name: "employee",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees"               ]
        }])
        .then(function(userInput) {
            if(userInput.employee === "View Departments") {
                return viewDepartment();
            }
            if(userInput.employee === "View Roles") {
                return viewRoles();
            }
            if(userInput.employee === "View Employees") {
                return viewEmployee();
            };
//Promt user to select what to do with departments
const testDepartment = () => {
    return inquirer
    .prompt ([
        {
            type: "list",
            message: "What would you like to do with the departments?",
            name: "department",
            choices: [
                "Add Department",
                "Delete Department",
                "Exit!"               ]
        }])
        .then(function(userInput) {
            if(userInput.department === "Add Department") {
                return addDepartments();
            }
            if(userInput.department === "Delete Department") {
                return deletDepartment();
            }
            if(userInput.department === "Exit") {
                return promptTracker();
            };

//Promt user to select what to do with roles
const viewRoles = () => {
    return inquirer
    .prompt ([
        {
            type: "list",
            message: "What would you like to do with the roles?",
            name: "roles",
            choices: [
                "Add Role",
                "Delete Role",
                "Exit!"               ]
        }])
        .then(function(userInput) {
            if(userInput.roles === "Add Role") {
                return addRoles();
            }
            if(userInput.roles === "Delete Role") {
                return deletRoles();
            }
            if(userInput.roles === "Exit") {
                return promptTracker();
            }
//Promt user to select what to do with employee
const viewEmployee = () => {
    return inquirer
    .prompt ([
        {
            type: "list",
            message: "What would you like to do with the Employee?",
            name: "employee",
            choices: [
                "Add Employee",
                "Delete Delete Employee",
                "Exit!"               ]
        }])
        .then(function(userInput) {
            if(userInput.employee === "Add Employee") {
                return addRoles();
            }
            if(userInput.employee === "Delete Employee") {
                return deletRoles();
            }
            if(userInput.employee === "Exit") {
                return promptTracker();
            }



promptTracker()})}})}})}})}