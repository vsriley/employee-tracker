//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//local connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootpass",
    database: "employeesDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startEmployeePrompt();
});


// prompt user for what they would like to do
function startEmployeePrompt(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Which action would you like to take?",
        choices: ["Add a department", "Add a role", "Add an employee", "View departments", "View roles", "View employees", "Update employee role", "Exit"]
        // Bonus: update employee managers, view employees by manager, delete departments, roles, and managers
    }).then(function(answer){
        console.log(answer.action);
        switch(answer.action){
            case "Add a department":
                //add a department function
                addDepartment();
                break;
            case "Add a role":
                //add a role function
                addRole();
                break;
            case "Add an employee":
                //add an employee function
                addEmployee();
                break;
            case "View departments":
                //view departments function
                viewDepartments();
                break;
            case "View roles":
                // view roles function
                viewRoles();
                break;
            case "View employees":
                // view employees function
                viewEmployees();
                break;
            case "Update employee role":
                // update employee role function
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
};

// add new department
function addDepartment(){
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function(err){
            if(err) throw err;
            console.log(`New department - ${answer.newDepartment} created successfully!`);
            startEmployeePrompt();
        })
    });
}

// add new role
function addRole(){
    inquirer.prompt([{
        name: "newRole",
        type: "input",
        message: "What role would you like to add?"
    }, {
        name: "salary",
        type: "input", 
        message: "What is their salary?",
        validate: validateSalary
    }, {
        name: "departmentID",
        type: "input",
        message: "What is their department id?",
        validate: validateID
    }]).then(function(answer){
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.salary, answer.departmentID], function(err){
            if(err) throw err;
            console.log(`New role - ${answer.newRole} created successfully!`);
            startEmployeePrompt();
        })
    });
}

// add new employee
function addEmployee(){
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
    }, {
        name: "lastName",
        type: "input", 
        message: "What is their last name?"
    }, {
        name: "roleID",
        type: "input",
        message: "What is their role id?",
        validate: validateID
    }, {
        name: "managerID",
        type: "input",
        message: "What is their manager's id?",
        validate: validateID
    }]).then(function(answer){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err){
            if(err) throw err;
            console.log(`New employee - ${answer.firstName} ${answer.lastName} created successfully!`);
            startEmployeePrompt();
        })
    });
}

// view all departments
function viewDepartments(){
    connection.query("SELECT * FROM department", function (err, res){
        if(err) throw err;
        console.table(res);
        startEmployeePrompt();
    });
}

// view all roles
function viewRoles(){
    connection.query("SELECT * FROM role", function (err, res){
        if(err) throw err;
        console.table(res);
        startEmployeePrompt();
    });
}

// view all employees
function viewEmployees(){
    connection.query("SELECT * FROM employee", function (err, res){
        if(err) throw err;
        console.table(res);
        startEmployeePrompt();
    });
}

// update employee role
function updateEmployeeRole(){

}

// ensures salary is a number
function validateSalary(salary){
    if(isNaN(salary)){
        return "Please enter a valid number for salary";
    }
    return true;
};

// ensures id is a number
function validateID(id){
    if(isNaN(id)){
        return "Please enter a valid number for id";
    }
    return true;
};

