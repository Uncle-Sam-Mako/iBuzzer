import React from 'react'
import { useSearchParams } from 'react-router-dom';
import usewebsocket from 'react-use-websocket';

let participants = [
    {"name" : "Freddy", "score" : 5},
    {"name" : "Clever", "score" : 3},
    {"name" : "Nadia", "score" : 2},
    {"name" : "Sam", "score" : 1},
    {"name" : "Nathalie", "score" : 2},
    {"name" : "Nathalie", "score" : 5},
]


function Room() {
    
    const WS_URL = 'ws://localhost:8000';

    const [searchParams] = useSearchParams();
    const username = searchParams.get("name") || "Anonyme";

     const {sendJsonMessage } = usewebsocket(WS_URL, {
        queryParams: {username} 
    })


    return (
        <div className="w-full md:w-md max-w-md bg-primary-blue text-white mx-auto">
            <div className="flex flex-col justify-around">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Question pour un chrétien</h2>
                    <p className="text-blue-300 text-lg font-bold my-2">{username}</p>
                </div>

                
                <div className="flex flex-col items-center my-3">
                    {/* Score */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="border-4 border-gray-500 rounded-full px-6 py-4 text-center">
                            <p className="text-xs text-gray-300">SCORE</p>
                            <p className="text-3xl font-bold">07</p>
                        </div>
                    </div>

                    {/* Buzzer Button */}
                    <button className="buzzer_btn w-56 h-56 rounded-full! font-extrabold text-2xl! hover:border-red-300! hover:bg-red-600 transition!">
                        Appuyez pour buzzer
                    </button>
                </div>

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