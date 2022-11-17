import React from 'react'
import colors from "../style/colors"

export default function RecomandedShowcase({Items,setSelected,DarkMode,data,index}) {
    const img_w=131
    const img_h=1.4833333333333334
    const LocalColor=DarkMode?colors.dark:colors.light
  return (
    <div className='RecomandedShowcase'>
        {Items.map((it,i)=>(<img key={i} onClick={()=>{setSelected(it.imdbID)}} style={{border:`2px solid ${LocalColor.borderColor}5`,width:img_w,height:img_h*img_w}} src={it.Poster}/>))}
    </div>
  )
}
