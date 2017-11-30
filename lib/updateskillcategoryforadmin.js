'use strict';

var mysql=require('./mysqlConnection');

module.exports = {

updateskillcategoryforadmin: function(req,res){
       
    var CategoryName = req.body.CategoryName;
    var date= new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    if (!req.body.CategoryId){ 
    //logger.info({ success: false, message: 'CategoryId must not empty'});
    console.log("CategoryId required");
    return res.status(401).send({success: false, message: 'CategoryId required'});
    
    }
    if (!req.body.CategoryName){ 
    //logger.info({ success: false, message: 'CategoryName must not empty'});
    console.log("CategoryName required");
    return res.status(401).send({success: false, message: 'CategoryName required'});
    
    }
    if (!req.body.Description){ 
    //logger.info({ success: false, message: 'Description must not empty'});
    console.log("Description required");
    return res.status(401).send({success: false, message: 'Description required'});
    
    }
    
    try {
    console.log("update category");
    mysql.query("UPDATE `categorymaster` SET `CategoryName`=?,`Description`=?,`ModifiedDate`=?  where `CategoryId`=?",[req.body.CategoryName,req.body.Description,date,req.body.CategoryId], function(err, result) {
    if (err) throw err;
    
    res.send("Successfully updated skill category details "+JSON.stringify(result));
    console.log(result);
    
    
    //logger.info({ success: true, message: 'Successfully category ' });
    console.log("updated ");
    });
    }catch (err) {
    console.error(err);
    }

    }
           
}

