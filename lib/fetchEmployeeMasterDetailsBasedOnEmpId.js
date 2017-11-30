'use strict';

var mysql=require('./mysqlConnection');

//var atob = require('atob');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

module.exports = {
    fetchEmployeeMasterDetailsBasedOnEmpId: function(req,res){
        try{
            var EmployeeId = req.params.EmployeeId;
            mysql.query(' SELECT DISTINCT employeemaster.ProfilePhoto AS ProfilePhoto,employeemaster.Password AS Password, employeemaster.EmployeeId AS EmployeeId, employeemaster.FirstName AS FirstName,employeemaster.LastName AS LastName,employeemaster.Username AS Username,employeemaster.HighestQualification AS HighestQualification,employeemaster.RoleId AS RoleId, employeemaster.Designation AS Designation,employeemaster.IsReportingHead AS IsReportingHead,employeemaster.Availability AS Availability,employeemaster.ReportingManager AS ReportingManager, employeemaster.email AS email,employeemaster.ContactNo AS ContactNo, employeemaster.PriorExprience AS PriorExprience,employeemaster.integraExperience AS integraExperience, (employeemaster.PriorExprience + employeemaster.integraExperience) AS totalExperience, employeemaster.PrimarySkill AS PrimarySkill,DATE_FORMAT(employeemaster.DateOfBirth,"%Y-%m-%d") AS DateOfBirth,DATE_FORMAT(employeemaster.DateOfJoining,"%Y-%m-%d") AS DateOfJoining,DATE_FORMAT(employeemaster.DateOfLeaving,"%Y-%m-%d") AS DateOfLeaving FROM employeemaster where employeemaster.EmployeeId = ' + mysql.escape(EmployeeId),function(err, results) {
            if (err) throw err;
            if (results.length === 0) {
            res.send({success: false, message: 'Data not found' + req.params.EmployeeId});
            //logger.info({ success: false, message: 'Data not found for this EmployeeId_ ' + req.params.EmployeeId});
            console.log("Data not found for this EmployeeId_ " + req.params.EmployeeId)
            } else {
            
            console.log("populate user details");
            
            for(var i=0; i<results.length;i++){
            results[i].Password =  cryptr.decrypt(results[i].Password);
            
            }
            res.send(results);
           // logger.info({ success: true, message: 'Successfully fetched Employee detail based on EmployeeId_  ' + req.params.EmployeeId});
            
            
            console.log(results);
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
           
    }

