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

function subway(res,keyword){
	var sql = 'select distinct dong from subway where station LIKE \'%{0}%\';'.format(keyword)
	connection.query(sql,function(err,result){
		if(result.length==0){
			res.json({
				result: "zero",
				data: null
			})
			return
		}
		loc ="";

		for(var i=0;i<result.length;i++){
			loc += result[i].dong
			if(i==result.length-1){
				break
			}
			loc += "|"
		}
		dong(res,loc)
	})
}

function dong(res,keyword){
	var sql = "select distinct gu,ro from seouladdress where dong regexp \'{0}\';".format(keyword)

		connection.query(sql,function(err,row){
			if(err){
				res.json({
					result:err,
					data: null
				})
			}else{
				
				if(row.length==0){
					res.json({
						result: "zero",
						data: null
					})
					return;
				}
				
				let loc ="";
				let gu = row[0].gu;
	
				for(var i=0;i<row.length;i++){
					loc += row[i].ro
					if(row[i].ro =""){
						continue
					}
					loc += "|"
				}
				
				loc = loc.substr(0,loc.length-1)
			
				var sq = "SELECT e.*,a.x as latitude,a.y as longitude FROM exhibition as e left join address_xy as a on a.place = e.place where e.address regexp \'{0}\'".format(loc)
				var sql = "select * from (select * from (SELECT e.*,a.x,a.y FROM exhibition as e left join address_xy as a on a.place = e.place) as f where f.address not regexp \'{0}\') as e where address regexp \'{1}\';".format(loc,gu)

				connection.query(sq+" union "+sql,function(err,_data){
					if(err){
						res.json({
							result:err,
							data: null
						})
					}else{
					
							res.json({
								result :"success",
								data: _data
							})
					}
						
					
				})
				
	
			}
		})
}
var num
router.post('/',(req,res)=>{
	var keyword = req.body.keyword;
	num  = keyword
	res.redirect('/place')
	
})
router.get('/place', (req,res,next)=>{
	var keyword = "종로";
	if(keyword.slice(-1) =="동" ||keyword.slice(-1)=="구"){
    	keyword = keyword.substr(0,keyword.length-1)
		dong(res,keyword)
	}
	else{
		if(keyword.slice(-1) =="역"){
			keyword = keyword.substr(0,keyword.length-1)
		}
		subway(res,keyword)
	}
	console.log(keyword)
	
})

router.get('/title',(req,res)=>{
		var keyword ="광수";
		var sql = 'SELECT e.*,a.x as latitude,a.y as longitude FROM exhibition as e left join address_xy as a on a.place = e.place where e.title regexp \'{0}\';'.format(keyword) 
		connection.query(sql,function(err,data){
			if(err){
				res.json({
					result: err,
					data : null
				})
			}
			else{
				res.json({
					result : "success",
					data : data
				})
			}
		})
	})

	router.get('/popular',(req,res)=>{
		var keyword ="";
		var sql = 'SELECT e.*,a.x as latitude,a.y as longitude FROM exhibition as e left join address_xy as a on a.place = e.place where e.title regexp \'{0}\' order by grade desc;'.format(keyword) 
		connection.query(sql,function(err,data){
			if(err){
				res.json({
					result: err,
					data : null
				})
			}
			else{
				res.json({
					result : "success",
					data : data
				})
			}
		})
	})


module.exports = router;