var socket = io()
socket.on('connect', function() {
	console.log('connected to server');

	// socket.emit('createMessage', {
	// 	from: 'client@bilal-h.com',
	// 	text: 'Hey, checking my own written custom chat app.'
	// })
});

socket.on('disconnect', function() {
	console.log('disconnected to server');
});

socket.on('newMessage', function(message) {
	console.log('new message', message)
})