const connection = require("./db/database")
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const promptTracker = () => {
    
  return inquirer.prompt([
      {
          type: 'list',
          name: 'welcome',
          message: 'Where would you like to start?',
          choices:
              ['Departments',
                'Roles',
                'Employees',]
      }
  ])
      .then(choice => {
          if (choice.welcome === 'Departments') {
              dataDepartments();
          } 
          else if (choice.welcome === 'Roles') {
              dataRoles();
          } 
          else if (choice.welcome === 'Employees') {
              dataEmployee();
          }
        })

//DEPARTMENT
function dataDepartments () {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'department',
        message: 'What would you like to do with Departments?:',
        choices:['View ALL Departments',
                'Add a New Department',
                'Return to Menu']
        }
])
    .then(choice => {
        if (choice.department === 'View ALL Departments') {
            viewDepartments();
        } 
        else if (choice.department === 'Add a New Department') {
            addDepartment();
        } 
        else if (choice.department === 'Return to Menu') {
            promptTracker();
        }
    }); }
 

function viewDepartments() {
    console.log('viewing by Department');
        connection.query ("SELECT id, department_name FROM department", function (err, result) {
            if (err) throw err;
        const departmentTable = cTable.getTable(result);
        console.log(departmentTable);
            dataDepartments();
        });
    };

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "What's the Department's name you would like to add?:",
        }
    ).then(answer => {
        const departmentAnswer = answer.departmentName;
        const mysql = "INSERT INTO department (department_name) VALUES ('" + departmentAnswer + "')";
        connection.query (mysql, function (err, result) {
            if (err) throw err;
        console.log("New Department Added!");
            dataDepartments();
        });
    });

};
};

//Roles
function dataRoles() {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'role',
        message: 'What would you like to do with Roles?:',
        choices:['View ALL Roles',
                'Add a New Role',
                'Return to Menu']
        }
])
    .then(choice => {
        if (choice.role === 'View ALL Roles') {
            viewRoles();
        } 
        else if (choice.role === 'Add a New Role') {
            addRole();
        } 
        else if (choice.role === 'Return to Menu') {
            promptTracker();
        }
    })}
function viewRoles() {
console.log('Viewing All Roles');
connection.query(
    `SELECT 
        roles.id AS ID,
        roles.title AS Title,
        roles.salary AS SALARY,
        department_id AS Department
        FROM roles
        LEFT JOIN department ON roles.department_id = department.id`,
    function (err, result) {
        if (err) throw err;
        const rolesTable = cTable.getTable(result);
        console.log(rolesTable);
        dataRoles();
    });
};

function addRole() {
connection.promise().query
    (`SELECT department.id, department.department_name FROM department`)
    .then(([rows])=> {
    var departments = rows.map(({id, department_name}) => ({
        name: department_name,
        value: id              
    }))
    return inquirer.prompt([{
        type: "input",
        name: "rolesTitle",
        message: "What's the Role name you would like to add?:",
        },
        {
        type: "input",
        name: "rolesSalary",
        message: "What is the average Salary of the new role?", 
        },
        {
        type: 'list',
        name: 'rolesDepartment',
        message: "Which Department does this role belong to?:",
        choices: departments
        }
    ]).then(answer => {
        const titleAnswer = answer.rolesTitle;
        const salaryAnswer = answer.rolesSalary;
        const departmentAnswer = answer.rolesDepartment;
        const mysql = "INSERT INTO roles (roles.title, roles.salary, roles.department_id) VALUES ?";
        const values = [[titleAnswer, salaryAnswer, departmentAnswer]];
        connection.query (mysql, [values], function (err, result) {
            if (err) throw err;
        console.log("New Role Added!");
            dataRoles();
        });
    });
    })
};
//Employees
function dataEmployee() {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'employee',
        message: 'What would you like to do with these Employees?:',
        choices:['View ALL Employees',
                'Hire (add) Employee',
                'Update an Existing Employee',
                'Return to Menu']
        }
])
    .then(choice => {
        if (choice.employee === 'View ALL Employees') {
            viewEmployees();
        } 
        else if (choice.employee === 'Hire (add) Employee') {
            addEmployee();
        } 
        else if (choice.employee === 'Update an Existing Employee') {
            updateEmployee();
        }
        else if (choice.employee === 'Return to Menu') {
            promptTracker();
        }
    })
function viewEmployees() {
    console.log('Viewing all Employees');
    //connection.query(`SELECT * FROM employee`,
    connection.query(`
        SELECT 
        employee.id AS ID,
        employee.first_name AS FirstName,
        employee.last_name AS LastName,
        roles_id AS Role,
        manager_id AS Manager
        FROM employee
        LEFT JOIN roles ON employee.roles_id = roles.id
        `,
       function (err, result) {
            if (err) throw err;
            const employeeTable = cTable.getTable(result);
            console.log(employeeTable);
            dataEmployee();
          }); 
        };

function addEmployee() {
connection.promise().query
    (`SELECT roles.id, roles.title FROM roles`)
    .then(([rows])=> {
    var roles = rows.map(({id, title}) => ({
        name: title,
        value: id              
    }))
connection.promise().query
    (`SELECT manager.id, manager.first_name FROM manager`)
    .then(([rows])=> {
        var manager = rows.map(({id, first_name}) => ({
            name: first_name,
            value: id 
        }))
    return inquirer.prompt([{
        type: "input",
        name: "employeeFirst",
        message: "What's the new Employee's First Name?:",
        },
        {
        type: "input",
        name: "employeeLast",
        message: "What is the new Employee's Last Name?:", 
        },
        {
        type: 'list',
        name: 'employeeRoles',
        message: "What Role will the new Employee be in?:",
        choices: roles
        },
        {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the New Employee's Manager?:",
        choices: manager,
        },
    ]).then(answer => {
        const firstAnswer = answer.employeeFirst;
        const lastAnswer = answer.employeeLast;
        const rolesAnswer = answer.employeeRoles;
        const managerAnswer = answer.employeeManager;
        const mysql = "INSERT INTO employee (employee.first_name, employee.last_name, employee.roles_id, employee.manager_id) VALUES ?";
        const values = [[firstAnswer, lastAnswer, rolesAnswer, managerAnswer]];
        connection.query (mysql, [values], function (err, result) {
            if (err) throw err;
        console.log("New Employee Added!");
            dataEmployee();
        })
    })
})
    })
}

function updateEmployee() {
    connection.promise().query(`
    SELECT employee.id, employee.first_name FROM employee`)
    .then(([rows])=> {
        var employees = rows.map(({ id, first_name }) => ({
            name: first_name,
            value: id   
        }))
    connection.promise().query(`
    SELECT roles.id, roles.title FROM roles`)
        .then(([rows])=> {
            var roles = rows.map(({ id, title }) => ({
            name: title,
            value: id
        }))
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeSelect',
            message: 'Select an Employee',
            choices: employees
        },
        {
            type: 'list',
            name: 'rolesSelect',
            message: 'Select a role',
            choices: roles
        }
    ])
    .then(answer => {
        const employeesAnswer = answer.employeeSelect;
        const rolesAnswer = answer.rolesSelect;
        const mysql = `UPDATE employee SET employee.roles_id VALUES ?`;
        const values = [[employeesAnswer, rolesAnswer]];
        connection.query (mysql, [values], function (err, result) {
            if (err) throw err;
        console.log("Employee Role Updated!");
            dataEmployee();
        })
    })
})

    });
    } 

}

promptTracker();