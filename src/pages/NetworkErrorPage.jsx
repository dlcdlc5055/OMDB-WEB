import React from 'react'
import "../style/pages/NetworkErrorPage.scss"
import colors from "../style/colors"


export default function NetworkErrorPage({DarkMode}) {
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div style={{backgroundColor:LocalColor.deleteBtnColor}} className='errorBg'>
      <h1 style={{color:colors.dark.textColor}}>Please connect to the internet to use this Site!</h1>
    </div>
  )
}
