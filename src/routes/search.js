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
				data: null,
				keyword : keyword
			})
			return
		}
		loc ="^";

		for(var i=0;i<result.length;i++){
			loc += result[i].dong
			if(i == result.length-1){
				break
			}
			loc +="|^"
		}
		
		
		dong(res,loc,keyword)
	})
}

function dong(res,keyword,word){
	var sql = "select distinct gu,ro from seouladdress where dong regexp \'{0}\';".format(keyword)
		
		connection.query(sql,function(err,row){
			if(err){
				res.json({
					result:err,
					data: null,
					keyword : word
				})
			}else{
				
				if(row.length==0){
					res.json({
						result: "zero",
						data: null,
						keyword : word
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
							data: null,
							keyword : word
						})
					}else{
					
							res.json({
								result :"success",
								data: _data,
								keyword : keyword
							})
					}
						
					
				})
				
	
			}
		})
}
var num;

router.post('/',(req,res)=>{
	var data = req.body.keyword;
	console.log(data)
	var invoke =['기가지니', '지니야','친구야']
	var word = '전시회'
	var place = ['부근','근처','주변']
	var listOfKey = data.split(' ')
	var st = 0;
	
	if(invoke.includes(listOfKey[0])){
		if(listOfKey[1] == word){
			category = "title"
			num = listOfKey[2]
			res.redirect('/search/title')
		}else if(place.includes(listOfKey[2])){
			num = listOfKey[1]
			res.redirect('/search/loc')
		}else{
			num = listOfKey[1]
			res.redirect('/search/place')
		}
	}else{
		if(listOfKey[0] == word){
			category = "title"
			num = listOfKey[1]
			res.redirect('/search/title')
		}else if(place.includes(listOfKey[1]) || listOfKey[1]==word){
			num = listOfKey[0]
			res.redirect('/search/loc')
		}else if(listOfKey[1] =='전시'){
			num = listOfKey[0]
			res.redirect('/search/place')
		}else{
			num = listOfKey[0]
			res.redirect('/search/loc')
		}
	}

	
})

router.get('/loc', (req,res,next)=>{
	var keyword = num;
	
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
	
})
router.get('/place', (req,res,next)=>{
	var keyword = num
	var sql = 'SELECT e.*,a.x as latitude,a.y as longitude FROM exhibition as e left join address_xy as a on a.place = e.place where e.place regexp \'{0}\';'.format(keyword) 
	connection.query(sql,function(err,data){
		if(err){
			res.json({
				result: err,
				data : null,
				keyword : keyword
			})
		}
		else{
			res.json({
				result : "success",
				data : data,
				keyword : keyword
			})
		}
	})
	
})

router.get('/title',(req,res)=>{
		var keyword =num
		var sql = 'SELECT e.*,a.x as latitude,a.y as longitude FROM exhibition as e left join address_xy as a on a.place = e.place where e.title regexp \'{0}\';'.format(keyword) 
		connection.query(sql,function(err,data){
			if(err){
				res.json({
					result: err,
					data : null,
					keyword : keyword
				})
			}
			else{
				res.json({
					result : "success",
					data : data,
					keyword : keyword
				})
			}
		})
	})

	


module.exports = router;