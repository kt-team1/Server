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
fs.readFile('./result/online_exhibit.csv', 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);
    var len = dataArray.length;
    console.log(len)
    var q = "delete from online_art;"
    connection.query(q)
    
    //get gu,dong, ro data by looping data process
    for(var i=1;i<len;i++){
        var listof = dataArray[i].split(';')
        //EXHIBITID;EXHIBITTITLE;AUTHOR;IMGURL;INDEX_1;INDEX_2;INDEX_3
        
        let dict = {"id":0,"title":1,"author":2,"poster":3,"idx1":4,"idx2":5, "idx3":6,"info":7}
        let id = listof[dict["id"]]
        let title = listof[dict["title"]]
        let author = listof[dict["author"]]
        let poster = listof[dict["poster"]]
        let date ="항상"
        let info = listof[dict["info"]]
        let idx1 = listof[dict["idx1"]]
        let idx2 = listof[dict["idx2"]]
        let idx3 = listof[dict["idx3"]]
        

        

        //exhibit_id,title,author,poster,date,info, index1,index2,index3
        var sql = "insert into online_art values ({0},\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\',{6},{7},{8});".format(id,title,author,poster,date,info,idx1,idx2,idx3)
        connection.query(sql, function(err,rows){
            if(err){
                console.log(err)
            }else{
                console.log(i+' success!')
            }
        })
    }
  });