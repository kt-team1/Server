var mysql = require('mysql');
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

async function searchTitle(keyword){
    var sql = "select * from exhibition where title LIKE \'%{0}%\';".format(keyword);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err)
        }else{
            //console.log(result)
            return JSON.stringify(result)
        }
    })
}

var stringa = searchTitle("파편")
console.log(stringa)