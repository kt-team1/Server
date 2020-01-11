var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var bodyParser = require('body-parser');
// var urlencode = require('urlencode');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var message;

var dbError = function(res, err){
    message = err.code
    console.log('Error while performing query.', err);
    res.json({
        result : message,
        filterwords: null
    })
}

router.get('/users/:user_hash', (req,res,next)=>{
	
	var result = "";

	connection.query('SELECT * FROM exhibition', function(err, rows){
		if(err){
			result = err;
			res.json({
				result: result,
				search: null
			})
		}
		else{
			result = "success";

			res.json({
				result: result,
				search: rows
			});

		}
	})
});

module.exports = router;