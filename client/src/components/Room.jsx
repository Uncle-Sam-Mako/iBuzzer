import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import usewebsocket from 'react-use-websocket';
import ParticipantScreen from './ParticipantScreen';
import HostScreen from './HostScreen';
import { useRef } from 'react';

let participants = [
    {"name" : "Freddy", "score" : 5},
    {"name" : "Clever", "score" : 3},
    {"name" : "Nadia", "score" : 2},
    {"name" : "Sam", "score" : 1},
    {"name" : "Nathalie", "score" : 2},
    {"name" : "Nathalie", "score" : 5},
]

const WS_URL = 'ws://localhost:8000';


function Room() {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams();
    const username = searchParams.get("name") || "Anonyme";
    const isAdmin = searchParams.get("admin") === "true";
    const [players, setPlayers] = useState([]);
    const [buzzed, setBuzzed] = useState(null);
    const wsRef = useRef(null);

    
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

            console.log("Message from server ", data);
        }
    })

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
                    isAdmin ? <HostScreen /> : <ParticipantScreen onBuzz={sendBuzz}/>
                }


                {/* Participants */}
                <div className="w-full my-3">
                    <p className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                        <span>👥</span> Participants
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        {participants.map((participant, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px]"
                            >
                                <p className="font-semibold">{participant.name}</p>
                                <p className="text-3xl font-bold text-gray-300">{participant.score}</p>
                                <p>pts</p>
                            </div>
                        ))}
                    </div>
                    <div className="my-5">
                      <button type="submit" className="w-full py-2 mt-4 text-white bg-button-red rounded-md hover:bg-button-red-hover">Quitter le jeu</button>
                  </div>
                </div>




            </div>
        </div>
    )
}

export default Room;