const mysql = require("mysql2/promise");
const pword = require("./pword");

const connection = mysql.createPool({
    user:"root",
    password: pword,
    host:"localhost",
    database:"users_crud"
})

module.exports = connection;