import { useState } from 'react';
import ParticipantForm from './components/ParticipantForm';
import HostForm from './components/HostForm';
import ParticipantScreen from './components/ParticipantScreen';
import HostScreen from './components/HostScreen';

import './App.css'

function App() {

  const [username, setUsername] = useState('');

  return (
    <>
      <ParticipantForm onSubmit={setUsername}/>
    </>
  )
}

export default App
