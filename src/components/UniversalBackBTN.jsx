import React,{useState} from 'react'
import "../style/components/UniversalBackBTN.scss"
import {IoArrowBackOutline} from "react-icons/io5"
import colors from "../style/colors"

export default function UniversalBackBTN({DarkMode,onBack}) {
  const [IsHover,setIsHover]=useState(false)
  const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div className='BackBTN' onClick={onBack} style={{color:LocalColor.textColor,backgroundColor:IsHover?LocalColor.backgroundActive:"#0000"}} onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}}>
        <IoArrowBackOutline/>
    </div>
  )
}
