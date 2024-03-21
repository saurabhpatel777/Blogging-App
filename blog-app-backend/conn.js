const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "blog-app",
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("connected");
    }
    else{
        console.log("not connected"+err);
    }
});

module.exports = mysqlConnection;
