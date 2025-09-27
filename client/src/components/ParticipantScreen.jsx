import React from 'react'


function ParticipantScreen() {
    return (


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

    )
}

export default ParticipantScreen;