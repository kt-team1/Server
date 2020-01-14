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
/* GET online list page. */
router.get('/', function(req, res, next) {
    let sql = "select exhibit_id,title,author,poster,date,info from online_art;"
    connection.query(sql, function(err,row){
        if(err){
            res.json({
                result: err,
                online_list : null
            })
        }else{
            res.json({
                result: "success",
                online_list : row
            })
        }
    })
	
});
router.get('/details/recommend',function(req,res){
    let sql = "select cluster_id from picture where pic_id =;"
    connection.query(sql, function(err,row){
        if(err){
            res.json({
                result: err,
                online_list : null
            })
        }else{
            res.json({
                result: "success",
                online_list : row
            })
        }
    })
})

module.exports = router;
