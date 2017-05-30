

var http = require ("http");
var fs = require("fs");

var server = http.createServer((req, res)=>{
	console.log ("Someone conntected via HTTP"); 
});



console.log("the node file is working")
server.listen(8080);
console.log("Listening on port 8080"); 