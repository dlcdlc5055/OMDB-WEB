import React from 'react'
import colors from "../style/colors"
import "../style/components/ListSelector.scss"
import {IoChevronForwardOutline} from "react-icons/io5"

export default function ListSelector({text,index,setSelected,DarkMode}) {
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div onClick={()=>{setSelected(index)}} className='ListItem' style={{backgroundColor:LocalColor.standardBackgroundcolor}}>
        <h2 style={{color:LocalColor.textColor}}>{text}</h2>
        <div style={{color:LocalColor.textColor}}><IoChevronForwardOutline/></div>
    </div>
  )
}
