'use strict';

var mysql=require('./mysqlConnection');

 

module.exports = {

upadatestatusmasterbyadmin: function(req,res){
       
var StatusName = req.body.StatusName;
var Id = req.body.Id;
if (!req.body.Id){ 
//logger.info({ success: false, message: 'Id must not empty'});
console.log("Id required");
return res.status(401).send({success: false, message: 'Id required'});

}
if (!req.body.Description){ 
//logger.info({ success: false, message: 'Description must not empty'});
console.log("Description required");
return res.status(401).send({success: false, message: 'Description required'});

}
if (!req.body.StatusName){ 
//logger.info({ success: false, message: 'StatusName must not empty'});
return res.status(401).send({success: false, message: 'StatusName required'});
console.log("StatusName required");

}

var date;
date = new Date().toISOString().slice(0, 19).replace('T', ' ');

try{
mysql.query("UPDATE `statusmaster` SET `StatusName`=?,`ModifiedDate`=?,`Description`=? where `Id`=?",[req.body.StatusName,date,req.body.Description,req.body.Id], function(err, result) {
if (err) throw err;


res.send("Successfully updated status master "+JSON.stringify(result));
console.log(result);


//logger.info({ success: true, message: 'Successfully updated status master ' });
console.log("updated status data");
});
}
catch (err) {
console.error(err);
}

        }
           
    }

