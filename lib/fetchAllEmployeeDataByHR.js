const mysql = require('mysql2');

var config =
{
    host: 'talentmanagementsystem-mysqldbserver.mysql.database.azure.com',
    user: 'mysqldbuser@talentmanagementsystem-mysqldbserver',
    password: 'int123$%^',
    database: 'db_tmp',
    port: 3306,
    ssl: true
};

const conn = new mysql.createConnection(config);


var fetchAllEmployeeDataByHR = function fetchAllEmployeeDataByHR(){
};

fetchAllEmployeeDataByHR.fetchAllEmployeeDataByHR = function(req, res) { 

  conn.query("SELECT * FROM employeemaster", function(err, results) {

   if (err) throw err;
  

	console.log(results);
	res.send(results);

 });
};
 
module.exports=fetchAllEmployeeDataByHR;


