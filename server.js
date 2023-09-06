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
    db.query(request, function(err, result) {
        if (err) throw err;
        console.log("Viewing All Departments:");
        console.log(result);
        run();
    })
};    

function viewRoles() {
    const request = `SELECT * FROM role`;
    db.query(request, function(err, result) {
        if (err) throw err;
        console.log("Viewing All Roles");
        console.log(result);
    })
}