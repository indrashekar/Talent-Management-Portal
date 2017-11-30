'use strict';

var mysql=require('./mysqlConnection');

module.exports = {
    fetchEmployeeMasterDetailsBasedOnUsername: function(req,res){
        try{
            var Username = req.params.Username; 
            mysql.query(' SELECT DISTINCT employeemaster.UserId,employeemaster.ProfilePhoto AS ProfilePhoto, employeemaster.EmployeeId AS EmployeeId, employeemaster.FirstName AS FirstName,employeemaster.LastName AS LastName,employeemaster.Username AS Username,employeemaster.Password AS Password,employeemaster.email AS email,employeemaster.Availability AS Availability,employeemaster.RoleId AS RoleId, roles.Name AS RoleName, employeemaster.Designation AS Designation,employeemaster.ReportingManager AS ReportingHead, employeemaster.email AS Email, employeemaster.PriorExprience AS PriorExprience,employeemaster.integraExperience AS integraExperience, (employeemaster.PriorExprience + employeemaster.integraExperience) AS totalExperience, employeemaster.PrimarySkill AS PrimarySkill,employeemaster.IsReportingHead AS IsReportingHead FROM employeemaster JOIN roles ON employeemaster.RoleId = roles.RoleID  where employeemaster.Username = ' + mysql.escape(Username),function(err, results) {
            if (err) throw err;
            if (results.length === 0) {
            res.status(403).send({success: false, message: 'Data not found' + req.params.Username});
           // logger.info({ success: false, message: 'Data not found for this Username_ ' + req.params.Username});
            console.log("Data not found for this UserId_ " + req.params.Username)
            } else {
            
            console.log("populate user details");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched Employee detail based on UserId_  ' + req.params.Username});
            
            
            console.log(results);
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
            
    }

