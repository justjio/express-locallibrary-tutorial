var User = require('../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');   

//Display SignUp form on GET
exports.user_signup_get = function(req, res, next) {
    res.render('signup', {title: 'SignUp Page'});
};

//Handle SignUp form on POST
exports.user_signup_post = [
    body('first_name').isLength({min: 1}).trim().withMessage('First name must be specified.')
        .isAlpha().withMessage('First name has non-alphabet characters.'),
    body('last_name').isLength({min: 1}).trim().withMessage('Last name must be specified.')
        .isAlpha().withMessage('Last name has non-alphabet characters.'),
    body('email').isLength({min: 1}).trim().withMessage('Email cannot be left unfilled.'),
    body('gender', 'Gender must be specified.').isLength({min: 1}).trim(),
    body('date_of_birth', 'Invalid date').optional({checkFalsy: true}).isISO8601(),
    body('password').isLength({min: 1}).withMessage('Password cannot be blank.'),

    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('gender').escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('password').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('signup', {title: 'SignUp Page', user: req.body, errors: errors.array()});
            return;
        } else {

            var user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    gender: req.body.gender,
                    date_of_birth: req.body.date_of_birth,
                    password: req.body.password
                });
            
            User.findOne({email: user.email}, function (err, results) {
                if (err || results == null) {
                    user.save(function (err) {
                        if (err) {
                            return next(err);
                        };
                        res.redirect('/catalog');
                    });
                    return;
                } else if (results !== null) {
                    res.render('signup', {title: 'Account already exists.', user: req.body});
                    return;
                }
            });
            
        };

    }

]

//Display Login form on GET
exports.user_login_get = function(req, res, next) {
    res.render('login', {title: 'Login Page'});
};

//Handle Login form on POST
exports.user_login_post = [

    body('email', 'Email must be specified.').isLength({min: 1}).trim(),
    body('password', 'Password cannot be blank.').isLength({min: 1}).trim(),

    sanitizeBody('*').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('login', {title: 'Login Page', user: req.body, errors: errors.array()});
        } 
        else {

            var user = new User({
                email: req.body.email,
                password: req.body.password
            });

            User.find({email: user.email, password: user.password}, function (err, results) {
                console.log(results);
                if (err || results.length === 0) {
                    res.render('login', {title: 'Email and/or Password Incorrect', user: req.body});                    
                    return;
                } else {
                    res.redirect('/catalog');
                    return;
                }
            });
        };
    }
]

exports.forgot_password_get = function (req, res, next) {
    res.render('forgotpassword', {title: 'Enter your Sign Up Email'});
};

exports.forgot_password_post = [

    body('email', 'Email must be specified.').isLength({min: 1}).trim(),
    
    sanitizeBody('*').escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.render('forgotpassword', {title: 'Enter correct Sign Up email.', user: req.body, errors: errors.array()});
        }
        else {
            User.find({email: req.body.email}, function (err, results) {
                console.log("\n User Details: \n" + results + "\n");
                if (err || results.length === 0) {
                    res.render('forgotpassword', {title: 'Email not in our Record.', user: req.body});
                    return;
                } else {
                    res.cookie('user', results[0]._id);
                    console.log('\n REQ.COOKIE now: \n' + req.cookies.user + '\n');
                    res.redirect('/users/changepassword');
                    return;
                };
            });
        };
    }

]

exports.change_password_get = function (req, res, next) {
    console.log(typeof req.cookies['user']);
    console.log("\n User Data Retrieved:" + req.cookies['user'] + "\n");
    res.render('changepassword', {title: 'Change Password'});
};

exports.change_password_post = [

    body('password_1', 'Password must be specified.').isLength({min: 1}).trim(),
    body('password_2', 'Password must be specified.').isLength({min: 1}).trim(),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('changepassword', {title: 'Change Password', user: req.body, errors: errors.array()});
        } 
        else if (req.body.password_1 !== req.body.password_2) {
            res.render('changepassword', {title: 'Passwords do not match', user: req.body});
        } 
        else if (req.body.password_1 === req.body.password_2) {
            User.findByIdAndUpdate(req.cookies['user'], {password: req.body.password_1}, function (err) {
                if (err) {return next(err)};
                
                res.clearCookie('user');
                res.redirect('/users/login');
            });
        };
    }
]