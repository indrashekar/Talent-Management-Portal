'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    updateEmployeeResourceSkillsByHR: function(req,res){
       
        if (!req.body.Rating){ 
           // logger.info({ success: false, message: 'Rating must not empty'});
            return res.status(401).send({success: false, message: 'Rating required'});
            console.log("Rating required");
            }  
            
            
            if (!req.body.EmployeeSkillId){ 
          //  logger.info({ success: false, message: 'EmployeeSkillId must not empty'});
            return res.status(401).send({success: false, message: 'EmployeeSkillId required'});
            console.log("EmployeeSkillId required");
            } 
            
            if (!req.body.UserId){ 
           // logger.info({ success: false, message: 'UserId must not empty'});
            return res.status(401).send({success: false, message: 'UserId required'});
            console.log("UserId required");
            } 
            
            var date;
            date = new Date().toISOString().slice(0, 19).replace('T', ' ');
           
            /*var updateEmployeeSkills = {
                EmployeeSkillId: req.body.EmployeeSkillId,
               UserId: req.body.UserId,
                Rating: req.body.Rating,
                ModifiedBy : req.body.ModifiedBy,
                ModifiedDate: date,
                }; */

            try {
                mysql.query("UPDATE `employeeskillmaster` SET `Rating`=?,`ModifiedDate`=?,`ModifiedBy`=? where `EmployeeSkillId`=? AND `UserId`=?", [req.body.Rating,date,req.body.ModifiedBy,req.body.EmployeeSkillId,req.body.UserId], function(err,result) {
                
                if (err) throw err;
                console.log("Updated Employee Resource Skills");
                
                res.send("Updated Employee Resource Skills ");
                console.log(result);
                
              //  logger.info({ success: true, message: 'Successfully Updated Employee Resource Skills for UserId_' + req.body.UserId});
                });
                }  catch (err) {
                // This will not catch the throw!
                console.error(err);
                }

        }
           
    }

