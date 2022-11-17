import React from 'react'
import colors from "../style/colors"
import Label from "../components/Label"
import {MdDelete} from "react-icons/md"

export default function MovieListItem({DarkMode,item,setSelected,setMovieList,index,list,deleteItemID}) {
    const LocalColor=DarkMode?colors.dark:colors.light
    const img_w=90
    const img_h=1.4833333333333334
    const Title=item.Title
    const Type=item.Type
    const Released=item.Released
    const ID=item.imdbID
  return (
    <div style={{backgroundColor:LocalColor.standardBackgroundcolor}} className='MovieListItem'>
        <div onClick={()=>{setSelected(ID)}} className='img-container'>
            <img draggable="false" style={{height:img_h*img_w,width:img_w}} src={item.Poster} alt="" />
        </div>
        <div onClick={()=>{setSelected(ID)}} className='content-div'>
            <div>
                <Label DarkMode={DarkMode} Text={"Title"} Size={15}/>
                <h4 style={{color:LocalColor.textColor}}>{Title}</h4>
            </div>
            <div>
                <Label DarkMode={DarkMode} Text={"Release Date"} Size={15}/>
                <h4 style={{color:LocalColor.textColor}}>{Released}</h4>
            </div>
            <div>
                <Label DarkMode={DarkMode} Text={"Media Type"} Size={15}/>
                <h4 style={{color:LocalColor.textColor}}>{Type}</h4>
            </div>
        </div>
        <div className='deleteContainer' style={{backgroundColor:LocalColor.deleteBtnColor}}>
            <div onClick={()=>{deleteItemID(list,ID,setMovieList)}} style={{color:colors.dark.textColor}} className='top'>
                <MdDelete/>
            </div>
        </div>
    </div>
  )
}
