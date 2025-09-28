import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import usewebsocket from 'react-use-websocket';
import ParticipantScreen from './ParticipantScreen';
import HostScreen from './HostScreen';


const WS_URL = 'https://ibuzzer.onrender.com';

console.log("WebSocket URL:", WS_URL);

function Room() {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams();
    const username = searchParams.get("name") || "Anonyme";
    const isAdmin = searchParams.get("admin") === "true";
    const [players, setPlayers] = useState([]);
    const [buzzerWinner, setBuzzerWinner] = useState(null);
    const [buzzerStatus, setBuzzerStatus] = useState("ready"); // "ready", "buzzed", "blocked"

    //WebSocket connection
    const {sendJsonMessage } = usewebsocket(WS_URL, {
        queryParams: {username},

        onOpen: () => {
            if(isAdmin){
                sendJsonMessage({type: "create-room", roomId: roomId, username: username})
            } else {
                sendJsonMessage({type: "join-room", roomId: roomId, username: username})
            }
        },

        onMessage: (message) => {
            const data = JSON.parse(message.data);

            if (data.type === "player-joined") {
                setPlayers(data.players);
            }

            if(data.type === "buzz"){
                if(data.playerName === username){
                    setBuzzerStatus("buzzed");
                } else {
                    setBuzzerStatus("blocked");
                }
                setBuzzerWinner(data.playerName);
            }

            if(data.type === "blocked"){       
                setBuzzerStatus("blocked");
            }

            if(data.type === "reset"){
                setBuzzerStatus("ready");
                setBuzzerWinner(null);
            }

    
            if (data.type === "force-disconnect") {
                alert("Vous avez été déconnecté !");
                window.location.href = "/"; // ou ton chemin de connexion
            }

            console.log("Message from server ", data);
        }
    })

    //
    const handleDisconnectAll = () => {
        sendJsonMessage({ type: "disconnect-all", roomId });
    };

    const sendBuzz = () => {
       sendJsonMessage({type: "buzz", roomId: roomId, username: username})
    }

    return (
        <div className="w-full md:w-md max-w-md bg-primary-blue text-white mx-auto">
            <div className="flex flex-col justify-around">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Question pour un chrétien</h2>
                    <p className="text-blue-300 text-lg font-bold my-2">{username}</p>
                </div>

                {
                    isAdmin ? <HostScreen buzzerWinner={buzzerWinner} onDisconnectAll={handleDisconnectAll}/> : <ParticipantScreen buzzerWinner={buzzerWinner} onBuzz={sendBuzz} buzzerStatus={buzzerStatus} />
                }


                {/* Participants */}
                <div className="w-full my-3">
                    <ul className="list bg-base-100 rounded-box shadow-md">

                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Liste des participants</li>

                        {players.map((participant, i) => (
                            <li key={i} className="list-row bg-gray-700 p-5 border-b-2 border-gray-600">
                                <div>
                                    <div>{participant}</div>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
                <div className="my-5">
                    <button type="submit" className="w-full py-2 mt-4 text-white bg-button-red rounded-md hover:bg-button-red-hover">Quitter le jeu</button>
                </div>
            </div>
        </div>
    
    )
}

export default Room;
