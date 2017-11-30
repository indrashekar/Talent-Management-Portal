'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    skillmasterlist: function(req,res){
        try{
            mysql.query("SELECT SkillId, SkillName from skillmaster order by SkillName ASC", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("role list");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched skills'});
            console.log(results);
           // logger.info("all skills");
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
           
    }

