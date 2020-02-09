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
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles
// Bonus: update employee managers, view employees by manager, delete departments, roles, and managers
}