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


