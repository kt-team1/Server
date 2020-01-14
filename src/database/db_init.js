var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);

// data loading
const infoJson = require("../routes/Crawler/exhibition.json")
const locJson = require("../routes/Crawler/exhibition_address.json")
const infoLen = Object.keys(infoJson.data).length;
const locLen = Object.keys(locJson.data).length;


String.prototype.format = function() {
    var theString = this;
    
    for (var i = 0; i < arguments.length; i++) {
        var regExp = new RegExp('\\{' + i + '\\}', 'gm');
        theString = theString.replace(regExp, arguments[i]);       
    }
    
    return theString;
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
  }
  

// delete all data for updating
connection.query('delete from exhibition');
connection.query('delete from address_xy')

// insert all data from crawling result.
for (var i = 0; i < infoLen; i++) {
    var arr = infoJson.data[i];
    let title = arr.title;    
    let date = arr.period
    let time = arr.time
    let place = arr.loc
    var price = arr.price
    let poster = arr.poster
    let address = arr.address
    if(typeof(price)==typeof("price")){
        let or ="0원"
        let rep ="0원\n"
        price = replaceAll(price,or,rep)
    }
    // id,title, place,address,date,time,price,poster
    var q= "insert into exhibition values ({0},\"{1}\",\"{2}\",NULL,\"{3}\",\"{4}\",\"{5}\",\"{6}\");".format(i,title,place,date,time,price,poster)
    
    connection.query(q);
    
}
// updating address data
for (var i = 0; i < locLen; i++) {
    var arr = locJson.data[i];
    let place = arr.location;
    let address= arr.address? arr.address: null;
    let x = arr.x
    let y= arr.y
    var sql = "insert into address_xy (place, address, x,y) values (\"{0}\",\"{1}\",{2},{3});".format(place,address,x,y)
    var sql2 = "update exhibition set address =\"{0}\" where place = \"{1}\";".format(address,place);
    connection.query(sql+sql2), function(err,result){
        if(err){
            connection.end();
        }
    };
}

var q = "update exhibition set address= place where address is null or address =\"null\"";

connection.query(q);
if(connection){
    connection.end();
}

