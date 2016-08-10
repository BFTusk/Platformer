function registerSocketEvents() {
	socket.emit('authenticate');
	socket.on('request_name', () => {
		clientState = 1;
	});
}