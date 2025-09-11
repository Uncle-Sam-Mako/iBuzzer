import { useState } from 'react'

import './App.css'

function App() {

  return (
    <>
      <div className="w-md bg-primary-blue text-white">
      <div className="">
        {/* Logo placeholder */}
        <div className="">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">C</span>
          </div>
        </div>

        {/* Form */}
        <form className="">
          <div>
            <label className="block mb-1 text-sm font-medium">Code de la salle</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Votre nom de joueur</label>
            <input
              type="text"
              placeholder="Ex: James Bond"
              className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-button-blue rounded-md hover:bg-button-blue-hover"
          >
            Rejoindre le jeu
          </button>
        </form>

        {/* Create room link */}
        <div className="mt-6 nk-blue text-center">
          <a href="#" className="text-link-blue hover:underline">
            Créer une salle de jeu ?
          </a>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-400">
          Projet Open Source developpé par{" "}
          <a href="#" className="hover:underline">
            Uncle Sam
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
