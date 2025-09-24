//Importing dependencies
const http = require('http');
const url = require('url');
const uuidv4 = require("uuid").v4;
const {WebSocketServer} = require('ws');

//Create the HTTP server
const server = http.createServer();

//Attach the WebSocket server
const wsServer = new WebSocketServer({server});

const port = 8000;

//connections list
const connections = {};
const users = {};

//Start the sever
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
})
