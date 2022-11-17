import React from 'react'
import Label from '../components/Label'
import "../style/pages/SettingsPage.scss"
import CheckMark from '../components/CheckMark'
import getSettings from "../scripts/getSettings"
import setSettings from "../scripts/setSettings"
import colors from "../style/colors"

export default function SettingsPage({DarkMode,setDarkMode}) {
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
      <div className='screenInner'>
        <Label DarkMode={DarkMode} Text={"Settings"}/>
        <div style={{color:LocalColor.textColor,backgroundColor:LocalColor.standardBackgroundcolor}} className="settingsContainer">
          <h3 style={{transition:"none"}}>Dark Theme</h3>
          <CheckMark onChange={(value)=>{setDarkMode(value);let settings=getSettings();settings.darkMode=value;setSettings(settings)}} defaultValue={DarkMode}/>
        </div>
      </div>
    </div>
  )
}
