import React from 'react'


let participants = [
    {"name" : "Freddy", "score" : 5},
    {"name" : "Clever", "score" : 3},
    {"name" : "Nadia", "score" : 2},
    {"name" : "Sam", "score" : 1},
    {"name" : "Nathalie", "score" : 2},
    {"name" : "Nathalie", "score" : 5},
]

function HostScreen() {
    return (
        <div className="w-full md:w-md max-w-md bg-primary-blue text-white mx-auto">
            <div className="flex flex-col justify-around">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Question pour un chrétien</h2>
                    <p className="text-blue-300 text-md font-bold my-2">05:19</p>
                </div>

                <div className=''>
                    <div className='options_container flex gap-2 my-2'>
                        <div className="sound_switch flex-1  bg-gray-700 rounded-lg px-4 py-3">
                            <span className='icon text-xl pr-1'>&#128264;</span>
                            Sound
                        </div>
                        <div className="buzzer_switch flex-1  bg-gray-700 rounded-lg px-4 py-3">
                            <span className='icon text-xl pr-1'>&#128308;</span>
                            buzzer
                        </div>
                    </div>
                    <div className='options_container flex gap-2 my-2'>
                        <div className="chrono flex-1  bg-gray-700 rounded-lg px-4 py-3">
                            <span className='icon text-xl pr-1'>&#128336;</span>
                            chrono
                        </div>
                        <div className="jingle flex-1  bg-gray-700 rounded-lg px-4 py-3">
                            <span className='icon text-xl pr-1'>&#127925;</span>
                            Jingle
                        </div>
                    </div>
                    <div className='reactions_container'>
                        <p className='font-bold mb-3'>Réactions</p>
                        <div className="reactions_list flex gap-2">
                            <div className="wrong_answer flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm" >
                                <span className='icon text-2xl'>&#10060;</span>
                                Wrong
                            </div>
                            <div className='right_answer flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm'>
                                <span className='icon text-2xl'>&#9989;</span>
                                Right
                            </div>
                            <div className="times_up flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm">
                                <span className='icon text-2xl'>&#128336;</span>
                                Time's up
                            </div>
                            <div className="qualified flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm">
                                <span className='icon text-2xl'>&#129395;</span>
                                Qualified
                            </div>
                        </div>
                    </div>
                </div>
               

                {/* Participants */}
                <div className="w-full my-3">
                    <p className="font-bold mb-3">
                        Participants
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
                      <button type="submit" className="w-full py-2 mt-4 text-white bg-button-red rounded-md hover:bg-button-red-hover">Mettre fin au jeu</button>
                  </div>
                </div>




            </div>
        </div>
    )
}

export default HostScreen;