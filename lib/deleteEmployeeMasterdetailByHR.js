'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    deleteEmployeeMasterdetailByHR: function(req,res){

        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try{
            mysql.query("UPDATE `employeemaster` SET `IsDeleted`=1,`ModifiedDate`=? where `EmployeeId`=?", [date,req.body.EmployeeId] , function(err,result) {
            
            if (err) throw err;
            console.log("Deleted Employee Master Detail for EmployeeId_" +req.body.EmployeeId);
            res.send("Deleted Employee Master Detail "+JSON.stringify(result));
            console.log(result);
           // logger.info({ success: true, message: 'Successfully Deleted Employee Master Detail for EmployeeId_' +req.body.EmployeeId});
            
            });
            }catch (err) { 
            console.error(err);
            }

        }
           
    }

