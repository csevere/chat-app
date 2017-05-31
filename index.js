

var http = require ("http");
var fs = require("fs");

// Include socket.io which was installed by npm. It is NOT part of core. 

var socketio = require("socket.io"); 

var server = http.createServer((req, res)=>{
	console.log ("Someone conntected via HTTP"); 
	fs.readFile('index.html', 'utf-8', (error, data)=>{
		console.log(error);
		console.log(data); 
		if(error){
			res.writeHead(500, {'content-type': 'text/html'});
			res.end('Internal Server Error');
		}else{
			res.writeHead(200, {'content-type': 'text/html'})
			//browser can only read this 
			// index. html read as variable data and sent node style
			res.end(data); 
		}
	});
});

//this runs on the server, separate from the index.html 
var io = socketio.listen(server); 
// sockets have .on -> listening and .emit -> send
// handle socket connections ...
//sockets are TCP/UDP
//callbacks 
io.sockets.on('connect',(socket) =>{
	console.log('Someone connected via socket.')

	socket.on('nameToServer', (name)=>{
		console.log(name + " just joined."); 
		io.sockets.emit('newUser', name); 
	});
	
	socket.on('sendMessage', ()=>{
		console.log("Someone clicked the button.");
	});

	socket.on('messageToServer', (messageObj)=>{
		//sockets send to everyone on server
		console.log(messageObj);
		io.sockets.emit('messageToClient', messageObj.newMessage + '--' + messageObj.name);

	})
});  

console.log("the node file is working")
server.listen(8080);
console.log("Listening on port 8080"); 