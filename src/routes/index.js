var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var dbError = function(res, err){
    message = err.code
    console.log('Error while performing query.', err);
    res.json({
        result : message,
        filterwords: null
    })
}
/* GET home page. */
router.get('/', function(req, res, next) {
	
	var recommend_sql = 'select * from exhibition ORDER BY rand() limit 4;'

	
	connection.query(recommend_sql, function(err, rows){
		if(err){
			res.json({
				result : err,
				data :null
			})
			
		}
		else{
			res.json({
				result : "success",
				data :rows
			})
			

		}					
 	 })
	 

});

// send online exhibition data
router.get('/home', function(req, res, next) {
	
	
	var sql = 'select exhibit_id, title, author, poster,date from online_art;'
	
	connection.query(sql, function(err, rows){
		
		if(err){
			res.json({
				result : err,
				data :null
			})
			
		}
		else{
			res.json({
				result : "success",
				data :rows
			})
			

		}			
 	 })
	 

});


module.exports = router;
