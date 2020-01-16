var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

String.prototype.format = function() {
    var theString = this;
    
    for (var i = 0; i < arguments.length; i++) {
        var regExp = new RegExp('\\{' + i + '\\}', 'gm');
        theString = theString.replace(regExp, arguments[i]);       
    }
    return theString;
}
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

router.get('/details/:id', function(req,res){
    var pic_id = req.params.id;
    
    let sql = "select pic_id, title, author, date_, img, info from picture where pic_id = {0};".format(pic_id)
    
    connection.query(sql,function(err,row){
        if(err){
            res.json({
                result:err,
                data : null
            })
        }else{
            res.json({
                result:"success",
                data : row
            })
            
        }
    })
})

router.get('/details/recommend/:id',function(req,res){
    var pic_id = req.params.id;
    let sql = "select cluster_id from picture where pic_id ={0};".format(pic_id);
    connection.query(sql, function(err,row){
        if(err){
            
        }else{
            var idx;
            
            switch(row[0].cluster_id){
                case 0:
                    idx ="index1"
                    break
                case 1:
                    idx ="index2"
                    break
                case 2:
                    idx ="index3"
                    break
            }
            var q = "select title,author, poster from online_art order by {0} desc limit 3;".format(idx)
            console.log(q)
            connection.query(q,function(err,row){
                if(err){
                    res.json({
                        result: err,
                        data : null
                    })
                }else{
                    res.json({
                        result :"success",
                        data : row
                    })
                }
            })


        }
    })
})

module.exports = router;
