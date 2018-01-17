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
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`)

	jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	})
})