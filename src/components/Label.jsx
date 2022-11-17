import React from 'react'
import "../style/components/label.scss"
import colors from "../style/colors"

export default function Label({DarkMode,Text,Size}) {
  const defaultSize=24
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <h1 className={`label`} style={{color:LocalColor.textColor,borderBottom:`2px solid ${LocalColor.borderColor}`,fontSize:Size==null?defaultSize:Size}}>{Text}</h1>
  )
}
