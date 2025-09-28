import React from 'react'



function ParticipantScreen({onBuzz, buzzerStatus, buzzerWinner}) {

    const buzzerMsg = {
        "ready": "Appuyez pour prendre la main",
        "buzzed": "Repondez rapidemment",
        "blocked": `Patientez... ${buzzerWinner ? `${buzzerWinner} a pris la main` : ""}`
    }
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
            <button onClick={onBuzz} 
                className={` 
                 ${buzzerStatus === "ready" ? "buzzer_ready hover:border-red-300!" : ""}  
                 ${buzzerStatus === "blocked" ? "buzzer_blocked hover:border-gray-300!" : ""} 
                 ${buzzerStatus === "buzzed" ? "buzzer_buzzed hover:border-yellow-300!" : ""} 
                 buzzer_btn w-56 h-56 rounded-full! font-extrabold text-2xl! transition!`}>
                {buzzerMsg[buzzerStatus]}
            </button>
        </div>

    )
}

export default ParticipantScreen;