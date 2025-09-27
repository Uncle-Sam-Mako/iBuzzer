import React from 'react'



function HostScreen() {
    return (

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
    )
}

export default HostScreen;