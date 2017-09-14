var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var port = 9000;
app.use(express.static(__dirname + '/public'));

app.get('/scrape', function(req, res) {
  var finished = 0;
  var baseUrl = "https://www.indeed.com/jobs?q=web+developer+remote&sort=date&start=0"
  var resultArray = [];
  for (var i = 0; i < 3; i++) {
    request(baseUrl + i, function(error, response, body) {
      var $ = cheerio.load(body);
      $('.result').filter(function() {
        var data = $(this);
        if (data.find(".sponsoredGray").length == 0) {
          var dataObject = {
            title: data.find(".jobtitle").text().trim(),
            summary: data.find(".summary").text().trim(),
            link: "indeed.com" + data.find(".turnstileLink").attr('href')
          }
          resultArray.push(dataObject);
        }
      })
      finished++
      //after all requests are done
      if (finished == 3) {

        
        res.send(resultArray)
      }
    })
  }
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/home.html');
})


app.listen('9000', function() {
    console.log("listening on " + port)
})

exports = module.exports = app;