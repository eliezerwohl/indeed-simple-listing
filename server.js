var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = 9000;
app.use(express.static(__dirname + '/public'));

app.get('/scrape', function(req, res){
	debugger
	res.send("got ya")

  //All the web scraping magic will happen here

})

app.get("/", function(req, res){
	res.sendFile(__dirname + '/home.html');
})


app.listen('9000', function(){
	console.log("listening on " + port)
})

exports = module.exports = app;