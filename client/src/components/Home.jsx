import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';




function Home() {


 
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('QPUC2025');

  const handleCreateRoom = () => {
    const roomId = "QPUC2025";
    navigate(`/room/${roomId}?admin=true&name=${username || "Admin"}`);
  };

  const handleJoinRoom = () => {
    if (!roomCode) return alert("Entrez un code de salle");
    navigate(`/room/${roomCode}?name=${username}`);
  };


  return (
    <div className="w-full md:w-md max-w-md bg-primary-blue text-white mx-auto">
      <div className="flex flex-col justify-around">
        {/* Logo placeholder */}
        <div className="app_logo my-3 flex justify-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">C</span>
          </div>
        </div>

        {/* Form */}
        <form className=""
          onSubmit={e => {
            e.preventDefault()
            handleJoinRoom();
            console.log(username)
          }}
        >
          <div className="my-5">
            <label className="block mb-1 text-sm font-medium">Code de la salle</label>
            <input
              value={roomCode}
              onChange={e => setRoomCode(e.target.value)}
              type="text"
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="my-5">
            <label className="block mb-1 text-sm font-medium">Votre nom de joueur</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="Ex: James Bond"
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="my-5">
            <input type='submit' className="w-full py-2 mt-4 text-white bg-button-blue rounded-md hover:bg-button-blue-hover" value={"Rejoindre le jeu"} />
          </div>
        </form>

        {/* Create room link */}
        <div className="mt-5 nk-blue text-center">
          <button onClick={handleCreateRoom} href="#"  className="text-link-blue hover:underline ring-2 ring-link-blue">
            Créer une salle de jeu ?
          </button>
        </div>

        <Footer></Footer>
      </div>
    </div>
  )
}

export default Home
