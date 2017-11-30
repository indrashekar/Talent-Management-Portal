'use strict';

var mysql=require('./mysqlConnection');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');

module.exports = { 

    login: function(req,res){

        if (!req.body.Username){ 
            //logger.info({ success: false, message: 'Username must not empty'});
            return res.send({success: false, message: 'Username required'});
            console.log("Username required");
            }  
            if (!req.body.Password){ 
            //logger.info({ success: false, message: 'Password must not empty'});
            return res.send({success: false, message: 'Password required'});
            console.log("Password required");
            }
            var pass = req.body.Password;
            
            // var password2 = passwordHash.generate(req.body.Password);
            try{
            mysql.query("SELECT employeemaster.Password,employeemaster.Username,employeemaster.EmployeeId, employeemaster.FirstName,employeemaster.LastName,roles.Name,roles.RoleID,employeemaster.DateOfJoining,employeemaster.DateOfBirth,employeemaster.ContactNo,employeemaster.email FROM employeemaster JOIN roles ON employeemaster.RoleId = roles.RoleID WHERE employeemaster.Username = ? and employeemaster.RoleId IN (1,2,3,5,4)",[req.body.Username],function (err,results){
            //var dbpass= results[0].Password;
            if(!results[0])
            {
                console.log("Username does not exists");
                res.send("Username does not exists");
            
            }
            else
            {
            
            var decryptedString = cryptr.decrypt(results[0].Password);
            
            if(results[0]  && decryptedString==req.body.Password) {
            
            
            var message = "Successfully logged in";
            console.log("login success");
            //logger.info({ success: true, message: 'Successfully logged '});
            //res.status(200).send(message);
            
            res.send("User logged in Successfully");
            
            //res.status(200).send("Successfully Login " + "\n \n Registered Employee Detail \n \n FirstName: " +JSON.stringify(results[0].FirstName)+ "\n LastName: " +JSON.stringify(results[0].LastName)+ "\n Username: " +JSON.stringify(results[0].Username)+ "\n RoleId: " +JSON.stringify(results[0].RoleID)+ "\n email: "+JSON.stringify(results[0].email)+ "\n roleName:" +JSON.stringify(results[0].Name)+ "\n Date Of Birth: "+JSON.stringify((results[0].DateOfBirth)+ "\n Date Of Joining: "+JSON.stringify(results[0].DateOfJoining)+ "\n Employee Id: "+JSON.stringify(results[0].EmployeeId));
            //res.status(200).send("Successfully Login " + "\n \n Registered Employee Detail \n \n FirstName: " +results[0].FirstName+ "\n LastName: " +results[0].LastName+ "\n Username: " +results[0].Username+ "\n RoleId: " +results[0].RoleID+ "\n email: "+results[0].email+ "\n roleName:" +results[0].Name+ "\n Date Of Birth: "+results[0].DateOfBirth+ "\n Date Of Joining: "+results[0].DateOfJoining+ "\n Employee Id: "+results[0].EmployeeId);
            
            }else {
            console.log("login error"); // true
            //logger.info({ success: true, message: 'login error'});
            res.send('Please enter the valid Username and Password');
            // res.redirect(req.baseUrl);
            
            }
            }
            });
            }
            catch (err) {
            console.error(err);
            }
       
    }   
}