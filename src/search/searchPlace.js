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



function dong(place){
    var sql = "select distinct gu,ro from seoulAddress where dong regexp \'{0}\';".format(place)

    connection.query(sql,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
            if(row.length==0){
                return
            }
            
            let loc ="";
            let gu = row[0].gu;
            console.log(row.length)
            for(var i=0;i<row.length;i++){
                loc += row[i].ro
                if(row[i].ro =""){
                    continue
                }
                loc += "|"
            }
            console.log(loc.length)
            console.log(loc)
            loc = loc.substr(0,loc.length-1)
            console.log(loc)
            console.log(typeof(loc))
            // var sq = "select ro from seoulAddress where dong regexp \'{0}\';".format(loc)
            var sq = "select title from exhibition where address regexp \'{0}\';".format(loc)
            connection.query(sq,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result)
                }
            })
            var sql = "select title from exhibition where address regexp \'{0}\';".format(gu)
            connection.query(sql,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    console.log(result)
                }
            })

        }
    })
}
function subway(place){
    var sql = 'select distinct dong from subway where station LIKE \'%{0}%\';'.format(place)
    connection.query(sql,function(err,result){
        if(result.length==0){
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
        console.log(loc)
        
        var sq = "select distinct gu, ro from seoulAddress where dong regexp \'{0}\';".format(loc)
        connection.query(sq,function(err,row){
            if(err){
                console.log(err)
            }else{
                console.log(row)
                if(row.length==0){
                    return
                }
                
                let loc ="";
                let gu = row[0].gu;
                console.log(row.length)
                for(var i=0;i<row.length;i++){
                    loc += row[i].ro
                    if(row[i].ro =""){
                        continue
                    }
                    loc += "|"
                }
               
                loc = loc.substr(0,loc.length-1)
                
                var sq = "select title from exhibition where address regexp \'{0}\';".format(loc)
                connection.query(sq,function(err,result){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                    }
                })
                var sql = "select title from exhibition where address regexp \'{0}\';".format(gu)
                connection.query(sql,function(err,result){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result)
                    }
                })
            }
        })
    })
}

var place = "삼성역";
if(place.slice(-1) =="동" ||place.slice(-1)=="구"){
    place = place.substr(0,place.length-1)
    console.log(place)
    dong(place);
}
else{
    if(place.slice(-1) =="역"){
        place = place.substr(0,place.length-1)
    }
    console.log(place)
    sub(place)
}

// connection.end();