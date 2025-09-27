//Importing dependencies
const http = require('http');
const url = require('url');
const uuidv4 = require("uuid").v4;
const {WebSocketServer} = require('ws');



const PORT = 8000;


//Create the HTTP server
const server = http.createServer();

//Attach the WebSocket server
const wsServer = new WebSocketServer({server});

let rooms = {};


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

    connection.on('message', message => {

        // Vérifie si c'est un buffer et parse en JSON
        if (message instanceof Buffer) {
            data = JSON.parse(message.toString());
        } else {
            data = message; // si déjà JSON
        }


        //If an admin wants to create a room
        if(data.type === "create-room"){
            console.log("Creating room ", data.roomId);
            rooms[data.roomId] = {players: {}, admin: connection};
            connection.send(JSON.stringify({type: "room-created", roomId: data.roomId}))
        }

        //If a player wants to join a room
        if(data.type === "join-room"){
            const {roomId, username} = data;

            //Check if the room exists
            if (!rooms[roomId]){
                connection.send(JSON.stringify({type: "error", message: "Room does not exist"}));
                return;
            }

            //add player to the room
            rooms[roomId].players[uuid] = connection;
            console.log("User ", username, " joined room ", roomId);
        }


        handleMessage(message, uuid)
    });

    //When a connection is closed
    connection.on("close", () => handleClose(uuid));


})

//connections list
const connections = {};
const users = {};

//Start the sever
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
})
