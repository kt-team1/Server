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

var dbError = function(res, err){
    message = err.code
    console.log('Error while performing query.', err);
    res.json({
        result : message,
        filterwords: null
    })
}

router.get('/searchapi', (req,res,next)=>{
	
	var result = "";

	connection.query('SELECT * FROM exhibition', function(err, rows){
		if(err){
			result = err;
			res.json({
				result: result,
				search: null
			})
		}
		else{
			result = "success";

			res.json({
				result: result,
				search: rows
			});

		}
	})
});



// /* GET : Load user's filterwords */

// router.get('/searchapi', function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.status(200).json(
//       {
//           "result" : "success",
//         "search": [
//             {
//               "exhibitionId" : "0",
//               "exhibitionTitle" : "제니 리 로빈슨",
//               "exhibitPoster" : "https://search.pstatic.net/common?type=ofullfill&size=256x368&quality=95&direct=true&src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F3029_000_7%2F20191212140722402_OCVN24YDQ.jpg%2F%25EC%25A0%259C%25EB%258B%2588.jpg%3Ftype%3Dm1501",
//               "exhibitionDate" : "2020.01.14. (화) ~ 2020.01.22. (수)",
//               "exhibitionTime" : "null",
//               "exhibitionPlace" : "비움갤러리",
//               "exhibitionAddress" : "서울특별시 중구 퇴계로36길 35 B1",
//               "exhibitionPrice" : "null",
//             },
//           ]
//       }
//     );
//   });


module.exports = router;