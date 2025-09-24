import React from 'react'

export default function HostForm() {
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
              <form className="">
                  <div className="my-5">
                      <label className="block mb-1 text-sm font-medium">Code de la salle</label>
                      <input
                          type="text"
                          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="my-5">
                      <label className="block mb-1 text-sm font-medium">Nom du jeu</label>
                      <input
                          type="text"
                          placeholder="Ex: Question pour un champion"
                          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="my-5">
                      <label className="block mb-1 text-sm font-medium">Nombre des participants</label>
                      <input
                          type="number"
                          className="w-full px-3 py-2 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="my-5">
                      <button type="submit" className="w-full py-2 mt-4 text-white bg-button-blue rounded-md hover:bg-button-blue-hover">Créer la salle de jeu</button>
                  </div>
              </form>

              {/* Create room link */}
              <div className="mt-5 nk-blue text-center">
                  <a href="#" className="text-link-blue hover:underline">
                      Rejoindre une salle de jeu ?
                  </a>
              </div>

              {/* Footer */}
              <div className="mt-10 text-center text-sm text-gray-400">
                  Open Source project developed by{" "}
                  <a href="#" className="hover:underline">
                      Uncle Sam
                  </a>
              </div>
          </div>
      </div>
  )
}
