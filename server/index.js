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


//Broadcast messages to all connected users
const broadcast = () => {
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        const message = JSON.stringify(users);
        connection.send(message);
    })
}

const handleMessage = (bytes, uuid) => {
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];

    user.state = message;

    broadcast();

    console.log(`${user.username} updated their state : ${JSON.stringify(user.state)}`);
}

//When a user log out
const handleClose = uuid => {

    console.log(`User ${users[uuid].username} has gone`);

    delete connections[uuid];
    delete users[uuid];

    //broadcast();
}


wsServer.on('connection', (connection, request) => {

    const { username } = url.parse(request.url, true).query;
    const uuid = uuidv4();

    connections[uuid] = connection;

    users[uuid] = {
        username : username,
        state : {

        }
    }

    connection.on('message', message => handleMessage(message, uuid));

    //When a connection is closed
    connection.on("close", () => handleClose(uuid));





    console.log(uuid);
    console.log(username);
})

//connections list
const connections = {};
const users = {};

//Start the sever
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
})
