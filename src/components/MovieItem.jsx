import React from 'react'
import "../style/components/MovieItem.scss"

export default function MovieItem({movie,id,setSelected,DarkMode}) {
    const img_w=133
    const img_h=1.4833333333333334
    return (
        <div  style={{width:img_w,height:img_w*img_h}}>
            <img draggable="false" onClick={()=>{setSelected(id)}} style={{border:`2px solid ${DarkMode?"#fff8":"#0008"}`,width:img_w,height:img_w*img_h,cursor:"pointer",borderRadius:5}} src={movie.Poster}/>
        </div>
    )
}
