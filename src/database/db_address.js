var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var fs = require('fs')
var connection = mysql.createConnection(dbconfig);

String.prototype.format = function() {
    var theString = this;
    
    for (var i = 0; i < arguments.length; i++) {
        var regExp = new RegExp('\\{' + i + '\\}', 'gm');
        theString = theString.replace(regExp, arguments[i]);       
    }
    return theString;
}



//load csv file
fs.readFile('./result/address_result.csv', 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);
    var len = dataArray.length;
    
    var q = "delete from seouladdress;"
    connection.query(q)
    
    //get gu,dong, ro data by looping data process
    for(var i=0;i<len;i++){
        var listof = dataArray[i].split(',')
        gu = listof[0]
        dong = listof[1]
        ro = listof[2]

        var sql = "insert into seouladdress values ({0},\"{1}\",\"{2}\",\"{3}\");".format(i,gu,dong,ro)
        connection.query(sql, function(err,rows){
            if(err){
                console.log(err)
                connection.end();
            }
        })
    }
    connection.end();
  });
//connection.end();