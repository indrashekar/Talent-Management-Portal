'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    roleslistforhr: function(req,res){
        try{
            mysql.query("SELECT RoleID, Name from roles order by Name ASC", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("role list");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched roles'});
            console.log(results);
           // logger.info("all roles");
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
           
    }

