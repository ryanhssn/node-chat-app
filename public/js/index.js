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
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);

})

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');

	var template = jQuery('#location-message-template').html();
	console.log(message)
	var html = Mustache.render(template, {
		url: message.url,
		latitude: message.latitude,
		longitude: message.longitude,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
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
