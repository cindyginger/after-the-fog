import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { click } from './lib/sound.js'
import { primeVoice } from './lib/voice.js'
import { recordVisit } from './lib/persist.js'
import Atmosphere from './components/Atmosphere.jsx'
import Tour from './components/Tour.jsx'
import Nav from './components/Nav.jsx'
import Landing from './pages/Landing.jsx'
import Hub from './pages/Hub.jsx'
import CharacterSelect from './pages/CharacterSelect.jsx'
import ChatPage from './pages/ChatPage.jsx'
import PlaceSelect from './pages/PlaceSelect.jsx'
import ScenePage from './pages/ScenePage.jsx'
import RoundtablePage from './pages/RoundtablePage.jsx'
import PyramidPage from './pages/PyramidPage.jsx'
import ReflectionPage from './pages/ReflectionPage.jsx'

export default function App() {
  const { pathname } = useLocation()
  const onLanding = pathname === '/'

  // One dry click for every interactive element — delegated globally.
  useEffect(() => {
    recordVisit()
    const onClick = (e) => {
      primeVoice()   // first user gesture unlocks speech synthesis
      if (e.target.closest('button, a')) click()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return (
    <>
      <Atmosphere />
      <Tour />
      {!onLanding && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/begin" element={<Hub />} />
        <Route path="/talk" element={<CharacterSelect />} />
        <Route path="/talk/:id" element={<ChatPage />} />
        <Route path="/place" element={<PlaceSelect />} />
        <Route path="/place/:id" element={<ScenePage />} />
        <Route path="/roundtable" element={<RoundtablePage />} />
        <Route path="/judgment" element={<PyramidPage />} />
        <Route path="/reflection" element={<ReflectionPage />} />
      </Routes>
    </>
  )
}
