require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');


const ascii = `███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████     ████████ ██████   █████   ██████ ██   ██ ███████ ██████       █████  ██████  ██████  
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██     ██   ██ ██   ██ ██   ██ 
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████          ██    ██████  ███████ ██      █████   █████   ██████      ███████ ██████  ██████  
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██             ██    ██   ██ ██   ██ ██      ██  ██  ██      ██   ██     ██   ██ ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████        ██    ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██     ██   ██ ██      ██      
                                                                                                                                                              
                                                                                                                                                              `
console.log(ascii);
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
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'View by Deparment ID',
                'Add New Employee',
                'Add New Role',
                'Add Department',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete an Employee',
                'Delete a Role',
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
                case 'View by Deparment ID':
                    viewByDept();
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
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'Update Employee Manager':
                    updateManager();
                    break;
                case 'Delete an Employee':
                    deleteEmployee();
                    break;
                case 'Delete a Role':
                    deleteRole();
                    break;
            }
        })
}
// View Employees
function viewEmployees() {
    const request = `SELECT 
    employee.id AS 'Employee ID', 
    employee.first_name AS 'First Name', 
    employee.last_name AS 'Last Name',
    role.title AS 'Job Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
FROM 
    employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee AS manager ON manager.id = employee.manager_id`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Employees:");
        console.table(result);
        run();
    })
};

// View Departments
function viewDepartments() {
    const request = `SELECT 
    id AS 'Department ID', 
    name AS 'Department Name' FROM department`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Departments:");
        console.table(result);
        run();
    })
};

//Viewing by department id
function viewByDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Department ID',
            name: 'departmentID'
        },
       

    ])
        .then(function (result) {
            db.query(`SELECT 
            employee.id AS 'Employee ID', 
            employee.first_name AS 'First Name', 
            employee.last_name AS 'Last Name',
            role.title AS 'Job Title',
            department.name AS 'Department',
            role.salary AS 'Salary',
            CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
        FROM 
            employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee AS manager ON manager.id = employee.manager_id
        WHERE department_id = ?;`,
                [ result.departmentID], function (err, result) {
                    if (err) throw err;
                    console.table(result);
                    run();
                });
        });
}

// View Roles
function viewRoles() {
    const request = `SELECT id AS 'Role ID', 
    title AS ' Job Title', 
    salary AS 'Salary', 
    department_id AS 'Department ID' FROM role`;
    db.query(request, function (err, result) {
        if (err) throw err;
        console.log("Viewing All Roles");
        console.table(result);
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
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
                [result.firstName, result.lastName, result.employeeRole, result.managerID], function (err, result) {
                    if (err) throw err;
                    console.table('New employee added successfully.');
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
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`,
            [result.newRole, result.newRoleSalary, result.newRoleID], function (err, result) {
                console.log(err)
                if (err) throw err;
                console.table(result);
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
    ]).then(function (result) {
        db.query(`INSERT INTO department(name) VALUES(?)`, [result.newDepartment], function (err, insertResult) {
            if (err) {
                console.log(err);
                throw err;
            }

            // Retrieve the inserted department from the database
            db.query(`SELECT * FROM department WHERE id = ?`, [insertResult.insertId], function (err, departmentResult) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                // Log the newly added department as a table
                console.log("New Department Added:");
                console.table(departmentResult);

                run();
            });
        });
    });
}

// UPDATE Employee role
// tested in log - works
function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name of the employee you want to update:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter the last name of the employee you want to update:',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter the new role ID for the employee:',
            name: 'newRoleID'
        },
    ]).then(function (result) {
        db.query(
            `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`,
            [result.newRoleID, result.firstName, result.lastName],
            function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Employee role updated successfully.');
                run();
            })
    })
}
//Update employee manager
function updateManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name of the employee you want to update:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter the last name of the employee you want to update:',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter the new manager ID for the employee:',
            name: 'newManagerID'
        },
    ]).then(function (result) {
        db.query(
            `UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`,
            [result.newManagerID, result.firstName, result.lastName],
            function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Employee role updated successfully.');
                run();
            })
    })
}
// Testing Delete - works
function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the first name of the employee you want to update:',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter the last name of the employee you want to update:',
            name: 'lastName'
        },
    ]).then(function (result) {
        db.query(
            `DELETE FROM employee WHERE first_name = ? AND last_name = ?`,
            [result.firstName, result.lastName],
            function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Employee succesfully deleted');
                run();
            })
    })
}
// tested - works!
function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What Role would you like to remove? Use Job Title name',
            name: 'deleteRole'
        },
        
    ]).then(function (result) {
        db.query(
            `DELETE FROM role WHERE title = ?`,
            [result.deleteRole],
            function (err, res) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Role succesfully deleted');
                run();
            })
    })
}

run();