import React from 'react'
import colors from "../style/colors"
import Label from './Label'

export default function MoviePageDataDysplayElement({DarkMode,Value}) {
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div className='MoviePageDataDysplayElement'>
        <Label DarkMode={DarkMode} Text={Value[0]}/>
        <p style={{color:LocalColor.textColor}}>{Value[1]}</p>
    </div>
  )
}
