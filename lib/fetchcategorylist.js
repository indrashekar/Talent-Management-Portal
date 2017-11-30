'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = {
    fetchcategorylist: function(req,res){
        try{
            mysql.query("select DISTINCT CategoryId ,CategoryName , Description from categorymaster where IsDeleted = 0 order by CategoryName ASC", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            res.status(403).send({success: false, message: 'Data not found'});
           // logger.info({ success: false, message: 'Data not found for categorymaster'});
            } else {
            console.log("category list for resource skills");
            res.send(results);
            console.log(results);
           // logger.info({ success: true, message: 'Successfully fetched category list for resource skills'});
            }
            });
            } catch (err) {
            console.error(err);
            }
        }
           
    }

