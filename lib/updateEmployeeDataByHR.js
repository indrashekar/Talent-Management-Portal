'use strict';

var mysql=require('./mysqlConnection');

var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');
var dateFormat = require('dateformat');

module.exports = {

    updateEmployeeDataByHR: function(req,res){
       
        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var encryptedString = cryptr.encrypt(req.body.Password);
        
        console.log("date of birth"+req.body.DateOfBirth);
        req.body.DateOfBirth=dateFormat(req.body.DateOfBirth, "yyyy-mm-dd");
        
        req.body.DateOfJoining=dateFormat(req.body.DateOfJoining, "yyyy-mm-dd");
        
        if(req.body.DateOfLeaving!==null){
        req.body.DateOfLeaving=dateFormat(req.body.DateOfLeaving, "yyyy-mm-dd");
        }
        
        if(req.body.integraExperience==""){
            req.body.integraExperience=0;
        }
        if(req.body.PriorExprience==""){
            req.body.PriorExprience=0;
        }
        

        
        try {
        mysql.query("UPDATE `employeemaster` SET `FirstName`=?,`LastName`=?,`Designation`=?,`Password`=?,`HighestQualification`=?,`ContactNo`=?,`Gender`=?,`PriorExprience`=?, `integraExperience`=?,`DateOfBirth`=?,`DateOfJoining`=?,`DateOfLeaving`=?,`ModifiedDate`=?,`RoleId`=?,`PrimarySkill`=?,`ReportingManager`=?,`IsReportingHead`=?,`ModifiedBy`=? where `EmployeeId`=?", [req.body.FirstName,req.body.LastName,req.body.Designation,encryptedString,req.body.HighestQualification,req.body.ContactNo,req.body.Gender,req.body.PriorExprience,req.body.integraExperience,req.body.DateOfBirth,req.body.DateOfJoining,req.body.DateOfLeaving,date, req.body.RoleId,req.body.PrimarySkill,req.body.ReportingManager,req.body.IsReportingHead,req.body.ModifiedBy, req.body.EmployeeId] , function(err,result) {
        
        if (err) throw err;
        console.log("Updated Resource Skills");
        res.send("Updated Resource Skills ");
        
        console.log(result);
        console.log("Successfully Updated Employee Data for employeeId_" + req.body.EmployeeId);
        
       // logger.info({ success: true, message: 'Successfully Updated Employee Data for employeeId_' + req.body.EmployeeId});
        });
        }  catch (err) {
        console.error(err);
        }
        }
           
    }

