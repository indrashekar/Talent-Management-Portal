'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    deleteEmployeeResourceSkillsByHR: function(req,res){
       
        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        
        if (!req.body.EmployeeSkillId){ 
        //logger.info({ success: false, message: 'EmployeeSkillId must not empty'});
        return res.status(401).send({success: false, message: 'EmployeeSkillId required'});
        console.log("EmployeeSkillId required");
        }
        
        if (!req.body.UserId){ 
        //logger.info({ success: false, message: 'UserId must not empty'});
        return res.status(401).send({success: false, message: 'UserId required'});
        console.log("UserId required");
        }
        
        try{
            
            mysql.query("UPDATE `employeeskillmaster` SET `IsDeleted`=1,`ModifiedDate`=? where `EmployeeSkillId`=? and `UserId`=?", [date,req.body.EmployeeSkillId, req.body.UserId] , function(err,result) {
            
            if (err) throw err;
            if(result.length === 0){
            res.send({success: false, message: 'Data not found' + req.body.UserId});
            //logger.info({ success: false, message: 'Data not found for this UserId_ ' + req.body.UserId});
            console.log("Data not found for this UserId_ " + req.params.UserId)
            } else{
                console.log("Deleted Resource Skill for UserID_" +req.body.UserId);
            res.send("Deleted Resource Skills ");
            console.log(result);
           // logger.info({ success: true, message: 'Successfully Deleted Resource Skill for UserID_' +req.body.UserId});
            
            
            }
            });
            
            }catch (err) {
            // This will not catch the throw!
            console.error(err);
            
            }

        }
           
    }

