require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');

// mySQL connection
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

function run() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option.',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Add New Employee',
                'Add New Role',
                'Add Department',
            ],
        }]).then((answer) => {
            switch (answer.choice) {

                case 'View Employees':

                    viewEmployees();
                    break;
                case 'View Roles':

                    viewRoles();
                    break;
                case 'View Departments':

                    viewDepartments();
                    break;
                case 'Add New Employee':

                    newEmployee();
                    break;
                case 'Add New Role':

                    newRole();
                    break;

                case 'Add Department':

                    newDepartment();
                    break;

            }
        })
}
// View Employees
function viewEmployees() {
    const request = `SELECT * FROM employees`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Employees:");
        console.log(result);
        run();
    })
};

// View Departments
function viewDepartments() {
    const request = `SELECT * FROM department`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Departments:");
        console.log(result);
        run();
    })
};

// View Roles
function viewRoles() {
    const request = `SELECT * FROM role`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Roles");
        console.log(result);
        run();
    })
}
// New Employee
function newEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee first name.',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter employee last name.',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter employee role number',
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: 'ID of Manager?',
            name: 'managerID'
        }

    ])
        .then(function (result) {
            db.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
                [result.firstName, result.lastName, result.employeeRole, result.managerID], function (err, result) {
                    if (err) throw err;
                    console.log('New employee added successfully.');
                    run();
                });
        });
}

// New Role
function newRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter new role.',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'Enter new role salary.',
            name: 'newRoleSalary'
        },
        {
            type: 'input',
            message: 'Enter new role ID',
            name: 'newRoleID'
        }
    ]).then(function (result) {
        db.query('INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)',
            [result.newRole, result.newRoleSalary, result.newRoleID], function (err, result) {
                console.log(err)
                if (err) throw err;
                console.log(result);
                run();
            })
    })

}

// New Department
function newDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter new department name.',
            name: 'newDepartment'
        },
        {
            type: 'input',
            message: 'Enter new department ID for this new department.',
            name: 'newDepartmentID'
        }
    ])
        .then(function (result) {
            db.query('INSERT INTO department(department_name, roles_id) VALUES(?,?)',
                [result.newDepartment, result.newDepartmentID], function (err, result) {
                    console.log(err)
                    if (err) throw err
                    console.log(result);
                    run();
                })
        })
}