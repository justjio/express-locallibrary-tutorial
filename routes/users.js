var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

//GET Signup Page
router.get('/signup', user_controller.user_signup_get);

//POST Signup Page
router.post('/signup', user_controller.user_signup_post);

//GET Login Page
router.get('/login', user_controller.user_login_get);

//POST Login Page
router.post('/login', user_controller.user_login_post);

//GET Forgot password form
router.get('/forgotpassword', user_controller.forgot_password_get);

//POST Forgot password form
router.post('/forgotpassword', user_controller.forgot_password_post);

//GET Change password form
router.get('/changepassword', user_controller.change_password_get);

//POST Change password form
router.post('/changepassword', user_controller.change_password_post);

module.exports = router;
