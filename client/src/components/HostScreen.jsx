import React from 'react'
import { useState, useRef } from 'react';



function HostScreen({buzzerWinner}) {

    const [isUnlocked, setIsUnlocked] = useState(false);

    const audioRef = useRef(null);

    const unlockAudio = () => {
        const audio = new Audio("/assets/sounds/right.mp3");
        audio.play().then(() => setIsUnlocked(true));
    };

    // garde la référence du son en cours
    const playSound = (file) => {
        // Stoppe le son actuel si il y en a un
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // remet au début
        }

        // Crée un nouveau son et joue
        const audio = new Audio(`/assets//sounds/${file}`);
        audioRef.current = audio;
        audio.play();
    };
    

    return (

        <div className=''>
            
            <div className='mb-4 p-4 bg-yellow-300 text-black font-bold text-center rounded-md'>
                {buzzerWinner ? `${buzzerWinner} a buzzé en premier !` : "En attente de buzz..."}
            </div>
            <div className='options_container flex gap-2 my-2'>
                <button onClick={unlockAudio} type="button" 
                    className={`${!isUnlocked ? "bg-gray-700" : "bg-blue-400"} rounded-lg px-4 py-3 sound_switch flex-1`}>
                    <span className='icon text-xl pr-1'>&#128264;</span>
                    Sound
                </button>
                <button type="button" className="buzzer_switch flex-1 bg-gray-700 rounded-lg px-4 py-3">
                    <span className='icon text-xl pr-1'>&#128308;</span>
                    buzzer
                </button>
            </div>
            <div className='options_container flex gap-2 my-2'>
                <button onClick={() => playSound("chrono.mp3")} type="button" className="chrono flex-1 bg-gray-700 rounded-lg px-4 py-3">
                    <span className='icon text-xl pr-1'>&#128336;</span>
                    chrono
                </button>
                <button onClick={() => playSound("jingle.mp3")} type="button" className="jingle flex-1 bg-gray-700 rounded-lg px-4 py-3">
                    <span className='icon text-xl pr-1'>&#127925;</span>
                    Jingle
                </button>
            </div>
            <div className='reactions_container'>
                <p className='font-bold mb-3'>Réactions</p>
                <div className="reactions_list flex gap-2">
                    <button onClick={() => playSound("wrong.mp3")} className="wrong_answer flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm" >
                        <span className='icon text-2xl'>&#10060;</span>
                        Wrong
                    </button>
                    <button onClick={() => playSound("right.mp3")} className='right_answer flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm'>
                        <span className='icon text-2xl'>&#9989;</span>
                        Right
                    </button>
                    <button onClick={() => playSound("time_s_up.mp3")} className="times_up flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm">
                        <span className='icon text-2xl'>&#128336;</span>
                        Time's up
                    </button>
                    <button onClick={() => playSound("jingle.mp3")} className="qualified flex flex-col items-center bg-gray-700 rounded-lg px-4 py-3 flex-1 min-w-[70px] font-bold text-sm">
                        <span className='icon text-2xl'>&#129395;</span>
                        Qualified
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HostScreen;