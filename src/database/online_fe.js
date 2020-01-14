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
fs.readFile('./result/online_artwork_FE.csv', 'utf8', function (err, data) {
    var dataArray = data.split(/\r?\n/);
    var len = dataArray.length
    console.log(len)
    
    var q = "delete from online_art;"
    connection.query(q)
    
    //get gu,dong, ro data by looping data process
    for(var i=1;i<len;i++){
        var listof = dataArray[i].split('@')
        //AUTHOR,EXHIBITID,TITLE,DATE,Img_URL,DESCRIPTION,cluster_id
        
        let dict = {"id":4,"poster":7,"info":8,"title":5,"author":3,"date":6,"cluster":9}
    
        let id = listof[dict["id"]]
        let title = listof[dict["title"]]
        let author = listof[dict["author"]]
        let poster = listof[dict["poster"]]
        let info = listof[dict["info"]]
        let date = listof[dict["date"]]
        let cluster =listof[dict["cluster"]]
    
        //pic_id, exhibit_id,title,author,date,info,img,cluster_id

        var sql = "insert into picture (exhibit_id,title,author,date_,info,img,cluster_id) values (?,?,?,?,?,?,?);"
        var item = [id,title,author,date, info,poster,cluster]
        sql = mysql.format(sql,item)
        connection.query(sql, function(err,rows){
            if(err){
                console.log(err)
                return;
            }
        })
    }
    
  });