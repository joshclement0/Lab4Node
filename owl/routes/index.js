var express = require('express');
var router = express.Router();
var request=require('request');
var fs=require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('owl.html', { root:  'public' });
});


router.get('/owl',function(req,res,next){
    var url = "https://owlbot.info/api/v1/dictionary/";
    url+=req.query['q'];
    url+="?format=json";
    console.log(url);
    request(url).pipe(res);
});

router.get('/cityFinder',function(req,res,next){
    fs.readFile(__dirname +'/cities.dat.txt',function(err,data){
        if(err)throw err;
        var cities=data.toString().split("\n");
        var jsonresult = [];
        for(var i =0;i<cities.length;i++){
            //console.log(cities[i]);
            var myRe = new RegExp("^" + req.query.q);
            var result = cities[i].search(myRe);
            if(result != -1) {
                jsonresult.push({city:cities[i]});
            }
        }
        res.status(200).json(jsonresult);
    })
    //var url="http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=";
    //url+=req.query['q'];
    //request(url).pipe(res);
});
router.get('/cityWeather',function(req,res,next){
    var apiKey="68eb709b72a5ed00f233e937a54f5177";
    var url= "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid="+apiKey+"&q=";
    url+=req.query['q'];
    request(url).pipe(res);
});
module.exports = router;
