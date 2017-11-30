'use strict';

var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 

module.exports = { 
    addstatusmasterbyadmin: function(req,res){
     
        var StatusName = req.body.StatusName;
        //logger.info(req.body);
        if (!req.body.StatusName){ 
        //logger.info({ success: false, message: 'StatusName must not empty'});
        console.log("StatusName required");
        return res.status(401).send({success: false, message: 'StatusName required'});
        
        }
        if (!req.body.Description){ 
        //logger.info({ success: false, message: 'Description must not empty'});
        console.log("Description required");
        return res.status(401).send({success: false, message: 'Description required'});
        
        }  
        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        var addstatusmasterbyadmin={
        
        StatusName:req.body.StatusName,
        Description : req.body.Description,
        IsDeleted : 0,
        CreatedDate: date,
        };

        mysql.query('SELECT * FROM statusmaster WHERE StatusName = ? ', [StatusName]
        ,function(err,rows){
        if(err)
        console.log(err);
        
        if (!rows.length)
        {
        
        try{
        console.log("add status");
        mysql.query('INSERT INTO statusmaster SET ?', addstatusmasterbyadmin,
        function(err, result) {
        if (err) throw err;
        if(result.length==0)
        {
        res.status(403).send({ success: false, message: 'data not inserted'});
        //logger.info({ success: false, message: 'failed to insert'});
        }
        else{
        
        
        res.send("Successfully added"+JSON.stringify(result));
        console.log(result);
        //logger.info({ success: true, message: 'Successfull added' });
        console.log("added");
        }
        });
        }  catch (err) {
        console.error(err);
        }}
        else
        {
        console.log("already status exist");
        res.send("already status exist");
        
        //logger.info({ success: false, message: 'already status exist' + req.body.UserId});
        }
        });
    }   
}