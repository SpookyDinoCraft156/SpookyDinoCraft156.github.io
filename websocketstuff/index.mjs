import WebSocket, { WebSocketServer } from 'ws';

const ws = new WebSocketServer({port: 53640});

ws.on('error', console.error);

ws.on('open', function() {
	ws.send("Hello World!");
});

ws.on('message', function message(data) {
	document.write("<p>data</p>");
});

