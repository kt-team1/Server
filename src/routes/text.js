var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/text', function (req, res) {
    var text = req.body.text;
    console.log(text);
    res.redirect('/search/place/'+encodeURI(text))
});


module.exports = router;