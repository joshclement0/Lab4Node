var express = require('express');
var router = express.Router();
var request=require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/owl',function(req,res,next){
    var url = "https://owlbot.info/api/v1/dictionary/";
    url+=req.query['q'];
    url+="?format=json";
    console.log(url);
    request(url).pipe(res);
});
router.get('/cityFinder',function(req,res,next){
    var url="http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=";
    url+=req.query['q'];
    request(url).pipe(res);
});
router.get('/cityWeather',function(req,res,next){
    var apiKey="68eb709b72a5ed00f233e937a54f5177";
    var url= "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid="+apiKey+"&q=";
    url+=req.query['q'];
    request(url).pipe(res);
});
module.exports = router;
