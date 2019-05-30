// Learning express.Router
//First import the express object and create an instance of the object - router
var express = require('express');
var router = express.Router();

//Next create different routes for different verbs and patterns
router.get('/', function (req, res) {
    res.send('Wiki home page');
})

router.get('/about', function (req, res) {
    res.send('About this Wiki');
})

//Export the router object
module.exports = router;