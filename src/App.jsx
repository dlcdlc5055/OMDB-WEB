import { useState } from 'react'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import SavedPage from './pages/SavedPage'
import SettingsPage from "./pages/SettingsPage"
import "./style/main.scss"
import Navbar from './components/Navbar'
import getSettings from "./scripts/getSettings"
import InitLocalData from "./scripts/InitLocalData"
import NetworkErrorPage from './pages/NetworkErrorPage'
import { useEffect } from 'react'

function App() {
  const [CurrentPage,setCurrentPage]=useState(0)
  const [DarkMode,setDarkMode]=useState(getSettings().darkMode)
  const [Connected,setConnected]=useState(navigator.onLine)
  useEffect(()=>{
    InitLocalData()
    setInterval(()=>{
      if(Connected!==navigator.onLine)
        setConnected(navigator.onLine)
    },200)
  },[])
  if(!Connected)
    return <NetworkErrorPage DarkMode={DarkMode}/>
  switch(CurrentPage){
    case 0:
      return <div><Navbar DarkMode={DarkMode} CurrentPage={CurrentPage} setCurrentPage={setCurrentPage}/><HomePage DarkMode={DarkMode}/></div>
    case 1:
      return <div><Navbar DarkMode={DarkMode} CurrentPage={CurrentPage} setCurrentPage={setCurrentPage}/><SearchPage DarkMode={DarkMode}/></div>
    case 2:
      return <div><Navbar DarkMode={DarkMode} CurrentPage={CurrentPage} setCurrentPage={setCurrentPage}/><SavedPage DarkMode={DarkMode}/></div>
    case 3:
      return <div><Navbar DarkMode={DarkMode} CurrentPage={CurrentPage} setCurrentPage={setCurrentPage}/><SettingsPage setDarkMode={setDarkMode} DarkMode={DarkMode}/></div>
    default:
      return <div></div>;
  }

}

export default App
