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
                'Update an Existing Department',
                'Remove a Department',
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
        else if (choice.department === 'Update an Existing Department') {
            updateDepartment();
        }
        else if (choice.department === 'Remove a Department') {
            deleteDepartment();
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
                'Update an Existing Role',
                'Remove a Role',
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
        else if (choice.role === 'Update an Existing Role') {
            updateRole();
        }
        else if (choice.role === 'Remove a Role') {
            deleteRole();
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
    inquirer.prompt({
        type: "input",
        name: "roleName",
        message: "What's the Role name you would like to add?:",
        }
    ).then(answer => {
        const departmentAnswer = answer.departmentRole;
        const mysql = "INSERT INTO roles (role.name) VALUES ('" + departmentAnswer + "')";
        connection.query (mysql, function (err, result) {
            if (err) throw err;
        console.log("New Department Added!");
            dataRoles();
        });
    });

};


function addRole() {
    connection.promise().query(`
    SELECT department_name, department_id FROM department
    `)
    .then(([rows])=> {
        var departments = rows.map(({name, id}) => ({
            name: name,
            value: id           
        }));
console.log(rows)
return inquirer.prompt([
{
    type: 'input',
    name: 'rolestitle',
    message: 'Provide a new roles TITLE',
    validate: rolesTitleInput => {
        if (rolesTitleInput) {
            return true;
        } else {
            console.log('Please enter a roles TITLE!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'rolesalary',
    message: 'Provide a new roles SALARY',
    validate: rolesalaryInput => {
        if (rolesalaryInput) {
            return true;
        } else {
            console.log('Please enter a roles SALARY')
        }
    }
},
{
    type: 'list',
    name: 'rolesdept',
    message: 'Provide select a DEPARTMENT',
    choices: departments},
])
.then(({rolestitle, rolesalary, rolesdept}) => {
    console.log('updating roles');
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [rolestitle, rolesalary, rolesdept];
    connection.query(sql, params, function (err, res) {
        if (err) {
            console.log(err);
        }
        console.log(`SUCCESSFULLY added roles`);
    });
    dataRoles();
})
    })
};
function updateRole() {
    connection.promise().query(`
    SELECT employee.last_name, employee.id, roles.id, roles.title 
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    `)
    .then(([rows])=> {
        var employees = rows.map(({ last_name, id }) => ({
            name: last_name,
            value: id   
        }))
        var roles = rows.map(({ id, title }) => ({
            name: title,
            value: id
        }))
    })
    console.log(rows)
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeelist',
            message: 'Select an Employee',
            choices: employees
        },
        {
            type: 'list',
            name: 'roleslist',
            message: 'Select a roles',
            choices: roles
        }
    ])
    .then(({employeelist, roleslist}) => {
        console.log('updating roles');
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [employeelist, roleslist];
        connection.query(sql, params, function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("Success!");
        });
    });
        dataRoles();
    } 

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
                'Fire (delete) Employee',
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
        else if (choice.employee === 'Fire (delete) Employee') {
            deleteEmployee();
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
      connection.promise().query(`
      SELECT roles.id, roles.title FROM roles
      `)
      .then(([rows])=> {
          var roles = rows.map(({id, title}) => ({
              name: title,
              value: id              
          }));
        console.log(rows)
        return inquirer.prompt([
        {
        type: 'input',
        name: 'firstname',
        message: 'Provide employee FIRST NAME',
        validate: firstNameInput => {
            if (firstNameInput) {
                return true;
            } else {
                console.log('Please enter FIRST NAME!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Provide employee LAST NAME',
        validate: lastNameInput => {
            if (lastNameInput) {
                return true;
            } else {
                console.log('Please enter LAST NAME')
            }
        }
    },
    {
        type: 'list',
        name: 'roleselect',
        message: 'Provide select a roles',
        choices: roles
    },
          ])
    .then(({firstname, lastname, roleselect}) => {  
        console.log('updating employee');
        const sql = `INSERT INTO employee (first_name, last_name, roles_id) VALUES (?, ?, ?)`;
        const params = [firstname, lastname, roleselect];
        connection.query(sql, params, function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log("Success!");
        });
        dataEmployee();
    })
})
};

}
promptTracker();