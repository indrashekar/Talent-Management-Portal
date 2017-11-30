'use strict';

var mysql=require('./mysqlConnection');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');
//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    fetchCurrentEmployeeDataByHR: function(req,res){
        try {
            
            mysql.query("SELECT DISTINCT employeemaster.UserId AS UserId, employeemaster.EmployeeId AS EmployeeId, employeemaster.Username AS Username, employeemaster.Password AS Password, employeemaster.RoleId AS RoleId, employeemaster.ProfilePhoto AS ProfilePhoto, employeemaster.EmployeeId AS EmployeeId, employeemaster.FirstName AS FirstName,employeemaster.LastName AS LastName, employeemaster.Designation AS Designation,employeemaster.ReportingManager AS Reporting_Head ,(SELECT CONCAT(employeemaster.FirstName, employeemaster.LastName) FROM employeemaster WHERE employeemaster.EmployeeId = Reporting_Head) AS  reportingmanager, employeemaster.email AS Email, employeemaster.PriorExprience AS PriorExprience,employeemaster.integraExperience AS integraExperience, (employeemaster.PriorExprience + employeemaster.integraExperience) AS totalExperience, skillmaster.SkillName AS PrimarySkill, employeemaster.DateOfLeaving AS DateOfLeaving FROM employeemaster JOIN skillmaster ON employeemaster.PrimarySkill = skillmaster.SkillId WHERE employeemaster.IsDeleted='0' ", function(err, results) {
            
            if (err) throw err;
            
            
            if (results.length === 0) {
            
            res.send("Current Employee Data not found");
            //logger.info({ success: false, message: 'Current Employee Data not found'});
            } else {
                for(var i=0; i<results.length;i++){
              var date;
             
            date = new Date().toISOString().slice(0, 19).replace(/T.*/, ' ');
            results[i].DateOfLeaving=date;
            results[i].Password =  cryptr.decrypt(results[i].Password);
            
            }
            console.log("Current Employee Data details");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched Current Employee Data'});
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
           
    }

