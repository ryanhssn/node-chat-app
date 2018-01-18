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
	var formattedTime = moment(message.createdAt).format('h:mm a');
	console.log('new message', message)
	var li = jQuery('<li></li>');
	li.text(`${message.from} ${formattedTime}: ${message.text}`)

	jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: ${formattedTime}`)
	a.attr('href', message.url)
	li.append(a);
	jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]')

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function() {
		messageTextBox.val('')
	})
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled')

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('sending location....')
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function () {
		alert('Unable to fetch location, using default');
		locationButton.removeAttr('disabled');
		socket.emit('createLocationMessage', {
			latitude: "40.7127837",
			longitude: "-74.00594130000002"
		})
	})
})
