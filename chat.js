const WebSocket = require('ws');

const chatServer = new WebSocket.Server({ port: 3003 });
console.log("🚀 Chat server is running on ws://localhost:3003");

chatServer.on('connection', (ws) => {
  console.log('🟢 New user connected to the chat.');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`); // ✅ fixed template literal

    // Broadcast the message to all connected clients
    chatServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('🔴 A user disconnected from the chat.');
  });
});
