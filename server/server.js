const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	socket.emit('newMessage', {
		from: 'support@bilal-h.com',
		text: 'demo text for chat app',
		createdAt: 7996485
	})

	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage)
	})

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
})


server.listen(port, () => {
	console.log(`Started on port ${port}`)
})