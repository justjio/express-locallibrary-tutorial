var User = require('../models/user');

//Display SignUp form on GET
exports.user_signup_get = function(req, res, next) {
    res.render('signup', {title: 'SignUp Page'});
};

//Handle SignUp form on POST
exports.user_signup_post = function(req, res, next) {
    res.send('Sign Up Page POST Under Construction!')
};

//Display Login form on GET
exports.user_login_get = function(req, res, next) {
    res.render('login', {title: 'Login Page'});
};

//Handle Login form on POST
exports.user_login_post = function(req, res, next) {
    res.send('Login Page POST Under Construction!')
};