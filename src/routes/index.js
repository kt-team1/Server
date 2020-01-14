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
	
	var recommend_sql = 'select * from exhibition where address regexp \'?\';'
	var isonline_sql = 'select exhibit_id, title from online_art;'
	
	connection.query(recommend_sql, function(err, rows){
		var recommend_result =""
		var isonline_result =""
		var recommend_data =null
		var isonline_data =null
		if(err){
			recommend_result = err;
			recommend_data =null
		}
		else{
			recommend_result = "success";
			recommend_data =rows

		}
		connection.query(isonline_sql,function(err,result){
			if(err){
				isonline_result = err;
				isonline_data= null;
			}else{
				isonline_result = "success";
				isonline_data= result;
			}
			res.json({
				recommend_result : recommend_result,
				recommend: recommend_data,
				isonline_result : isonline_result,
				isonline : isonline_data
			})
		})
			
 	 })
	 

});


module.exports = router;
