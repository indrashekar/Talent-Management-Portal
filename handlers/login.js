'use strict';

var login = require('../lib/login');

module.exports = {
    
    post: function login_post(req, res) {
        login.login(req,res,req.params['Username'],req.params['pass']);
    }
};
