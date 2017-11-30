'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    branchlistforhr: function(req,res){
        try{
            mysql.query("SELECT BranchId, BranchName from branch WHERE IsDeleted='0' order by BranchId ASC", function(err, results) {
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("managers");
            res.send(results);
           // logger.info({ success: true, message: 'Successfully fetched branch list'});
            console.log(results);
            //logger.info(results);
            }
            });
            } catch (err) {
            console.error(err);
            
            };
        }
           
    }

