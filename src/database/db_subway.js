var mysql = require('mysql');
var fs = require('fs')
var dbconfig = require('../config/database.js');
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
fs.readFile('./result/subway_result.csv', 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);
    var len = dataArray.length;
    
    //connection.connect();
    var q = "delete from subway;"
    connection.query(q)
    
    //get gu,dong, ro data by looping data process
    for(var i=0;i<len;i++){
        var listof = dataArray[i].split(',')
        line = listof[0] // num of line
        station = listof[1] //
        gu = listof[2]
        dong = listof[3]
        ro = listof[4]
        
        var sql = "insert into subway values (\"{0}\",\"{1}\",\"{2}\",\"{3}\",\"{4}\");".format(line,station,gu,dong,ro)
        connection.query(sql,function(err,rows){
            if(err){
                console.log(err)
            }
        })
    }
    //connection.end();
  });

 
//connection.end();