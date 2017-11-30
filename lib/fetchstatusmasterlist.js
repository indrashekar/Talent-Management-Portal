'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    fetchstatusmasterlist: function(req,res){
        try{
            //var id = req.params.id;
            mysql.query("SELECT  DISTINCT Id,StatusName,Description from statusmaster  WHERE statusmaster.IsDeleted='0'", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("skilllist");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched skills'});
            console.log(results);
            }
            });
            }
            catch (err) {
            console.error(err);
            }
        }
           
    }

