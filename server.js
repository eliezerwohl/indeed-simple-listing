var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = 9000;
app.use(express.static(__dirname + '/public'));

app.get('/scrape', function(req, res){
	var resultArray = [];
	request('https://www.indeed.com/jobs?q=javascript%20remote&l&sort=date&ts=1505243369075&rq=1&fromage=last', function (error, response, body) {
	var $ = cheerio.load(body);
		$('.result').filter(function(){
			var data = $(this);
			    console.log((data.find(".jobtitle").text().trim()))
			if (data.find(".sponsoredGray").length == 0){
				console.log("not sponsored")
			}
			else {
				console.log("sponsored")
			}

       resultArray.push((data.find(".jobtitle").text().trim()))
    	console.log((data.find(".summary").text().trim()))
    	console.log(" ")
       // console.log(data.find(".sponsoredGray").text()) 
 		})
		res.send(resultArray)
	})		
})

app.get("/", function(req, res){
	res.sendFile(__dirname + '/home.html');
})


app.listen('9000', function(){
	console.log("listening on " + port)
})

exports = module.exports = app;