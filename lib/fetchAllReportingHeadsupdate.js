'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
        fetchAllReportingHeadsupdate: function(req,res){
         
        try {
            var id = req.params.id;
        //mysql.query("SELECT EmployeeId AS ReportingManager,CONCAT(FirstName ,'',LastName) AS ManagerName FROM employeemaster WHERE IsReportingHead = '1' and IsDeleted='0'", function(err, results) {
        mysql.query("SELECT EmployeeId,IF(ISNULL(LastName), FirstName, CONCAT(FirstName, ' ', LastName)) AS ManagerName FROM employeemaster WHERE IsReportingHead = '1' AND IsDeleted='0' AND EmployeeId!="+ mysql.escape(id), function(err, results) {
        if (err) throw err;
        if (results.length === 0) {
        res.status(403).send({ success: false, message: 'Data not found'});
        //logger.info({ success: false, message: 'Reporting_Head Data not found'});
        } else {
        console.log("All Employee Data details");
        res.send(results);
        //logger.info({ success: true, message: 'Successfully fetched All Reporting_Head Data'});
        }
        });
        } catch (err) {
        console.error(err);
        }

        }
           
    }

