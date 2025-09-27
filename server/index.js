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

let buzzerWinnerId = null;

//Broadcast messages to all connected users
const broadcast = (roomId, message) => {
    const room = rooms[roomId];
    if (!room) return; // Room does not exist
    
    const allConnections = [...Object.values(room.players), room.admin]; //
    
    allConnections.forEach(conn => {    
        if(conn && conn.readyState === conn.OPEN) {
            conn.send(JSON.stringify(message));
        }
    });
}

const handleMessage = (roomId, bytes, uuid) => {
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];

    user.state = message;

   
    broadcast(roomId, JSON.stringify({users}));

    console.log("uuid : ", uuid)

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
            rooms[roomId].players[username] = connection; 
            console.log("User ", username, " joined room ", roomId);

            broadcast(roomId, {
                type: "player-joined",
                playerName: username,
                players: Object.keys(rooms[roomId].players),
            });
        }

        //If a player buzz
        if(data.type === "buzz"){
            const {roomId, username} = data;
            const room = rooms[roomId];

            if(!room){
                connection.send(JSON.stringify({type: "error", message: "Room does not exist"}));
                return;
            }

            if(room.locked){
                connection.send(JSON.stringify({type: "blocked", message: "Buzzer is locked"}));
                return;
            }

            room.locked = true;
            room.buzzerWinnerId = uuid;

            // Notify all players about the buzz event
            const allConnections = [...Object.values(room.players), room.admin]; 

            allConnections.forEach(conn => {
                if(conn && conn.readyState === conn.OPEN) {
                    if(conn === connection){
                        conn.send(JSON.stringify({type: "buzz", message: "You are the first to buzz!"}));
                    } else {
                        conn.send(JSON.stringify({type: "buzz", message: `${username} has buzzed first!`}));
                    }
                }
            });

            broadcast(roomId, {
                type: "buzz",
                playerName: username,
            });

            // Auto-reset the buzzer after 5 seconds
            setTimeout(() => {
                if (room) {
                    room.locked = false;
                    room.buzzerWinner = null;
                    broadcast(roomId, { type: "reset" });
                }
            }, 5000);
        }

        if (data.type === "disconnect-all") {
            const room = rooms[data.roomId];
            if (!room) return;

            const allSockets = [...Object.values(room.players), room.admin];

            allSockets.forEach(socket => {
                if (socket && socket.readyState === 1) {
                    socket.send(JSON.stringify({ type: "force-disconnect" }));
                    socket.close();
                }
            });

            delete rooms[data.roomId];
        }




        console.log('data', data); 

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
