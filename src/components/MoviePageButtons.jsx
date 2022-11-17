import React from 'react'
import colors from "../style/colors"
import "../style/pages/MoviePage.scss"
import {AiFillLike,AiFillDislike,AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import {IoMdDownload,IoIosPlay} from "react-icons/io"
import {MdFileDownloadDone,MdPlayDisabled} from "react-icons/md"
import {BsBookmark,BsBookmarkFill} from "react-icons/bs"
import { useState } from 'react'
import InitLocalData from "../scripts/InitLocalData"

function InitLocalState(id){
    const state=[false,false,false,false,false]
    const data=InitLocalData()
    state[0]=data.licked.includes(id)
    state[1]=data.dislicked.includes(id)
    state[2]=data.experienced.includes(id)
    state[3]=data.downloaded.includes(id)
    state[4]=data.bookmarked.includes(id)
    return state
}

function process(key,id){
    console.log(InitLocalState(id));
    const allData=InitLocalData()
    let data=JSON.parse(localStorage.getItem(key))
    if(!data.includes(id))
        data.push(id)
    else
        data=data.filter((value,i)=>value!=id)
    if(key==="licked" && data.includes(id)){
        allData.dislicked=allData.dislicked.filter((value,i)=>value!=id)
        localStorage.setItem("dislicked",JSON.stringify(allData.dislicked))
    }else if(key==="dislicked" && data.includes(id)){
        allData.licked=allData.licked.filter((value,i)=>value!=id)
        localStorage.setItem("licked",JSON.stringify(allData.licked))
    }
    localStorage.setItem(key,JSON.stringify(data))
    return InitLocalState(id)
}

function hovers(index,value,hovers,setHovers){
    let arr=JSON.parse(JSON.stringify(hovers))
    arr[index]=value
    if(hovers[index]!=arr[index])
        setHovers(arr)
}

export default function MoviePageButtons({DarkMode,ID,Vertical,Data}) {
    const LocalColor=DarkMode?colors.dark:colors.light
    const [Hover0,setHover0]=useState(false)
    const [Hover1,setHover1]=useState(false)
    const [Hover2,setHover2]=useState(false)
    const [Hover3,setHover3]=useState(false)
    const [Hover4,setHover4]=useState(false)
    const [LocalState,setLocalState]=useState(InitLocalState(ID))
    const isGame=Data.Type.toLowerCase()=="game"
    if(Vertical){
        return (
            <div style={{border:`2px solid ${LocalColor.borderColor}`,backgroundColor:LocalColor.secundaryBackgroundcolor}} className='MoviePageButtonsVertical'>
                <div onMouseUp={()=>{setHover0(true)}} onMouseDown={()=>{setHover0(false)}} onMouseLeave={()=>{setHover0(false)}} onMouseEnter={()=>{setHover0(true)}} onClick={()=>{setLocalState(process("licked",ID))}} style={{backgroundColor:!Hover0?"#0000":LocalColor.backgroundActive,color:LocalState[0]?LocalColor.likeColor:LocalColor.textColor}} className='button'><AiFillLike/></div>
                <div onMouseUp={()=>{setHover1(true)}} onMouseDown={()=>{setHover1(false)}} onMouseLeave={()=>{setHover1(false)}} onMouseEnter={()=>{setHover1(true)}} onClick={()=>{setLocalState(process("dislicked",ID))}} style={{backgroundColor:!Hover1?"#0000":LocalColor.backgroundActive,color:LocalState[1]?LocalColor.dislikeColor:LocalColor.textColor}} className='button'><AiFillDislike/></div>
                <div onMouseUp={()=>{setHover2(true)}} onMouseDown={()=>{setHover2(false)}} onMouseLeave={()=>{setHover2(false)}} onMouseEnter={()=>{setHover2(true)}} onClick={()=>{setLocalState(process("experienced",ID))}} style={{backgroundColor:!Hover2?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[2]?isGame?<IoIosPlay/>:<AiFillEye/>:isGame?<MdPlayDisabled/>:<AiFillEyeInvisible/>}</div>
                <div onMouseUp={()=>{setHover3(true)}} onMouseDown={()=>{setHover3(false)}} onMouseLeave={()=>{setHover3(false)}} onMouseEnter={()=>{setHover3(true)}} onClick={()=>{setLocalState(process("downloaded",ID))}} style={{backgroundColor:!Hover3?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[3]?<MdFileDownloadDone/>:<IoMdDownload/>}</div>
                <div onMouseUp={()=>{setHover4(true)}} onMouseDown={()=>{setHover4(false)}} onMouseLeave={()=>{setHover4(false)}} onMouseEnter={()=>{setHover4(true)}} onClick={()=>{setLocalState(process("bookmarked",ID))}}  style={{backgroundColor:!Hover4?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[4]?<BsBookmarkFill/>:<BsBookmark/>}</div>
            </div>
        )
    }
    return (
        <div style={{backgroundColor:LocalColor.standardBackgroundcolor}} className='MoviePageButtonsHorizontal'>
            <div onMouseUp={()=>{setHover0(true)}} onMouseDown={()=>{setHover0(false)}} onMouseLeave={()=>{setHover0(false)}} onMouseEnter={()=>{setHover0(true)}} onClick={()=>{setLocalState(process("licked",ID))}} style={{backgroundColor:!Hover0?"#0000":LocalColor.backgroundActive,color:LocalState[0]?LocalColor.likeColor:LocalColor.textColor}} className='button'><AiFillLike/></div>
            <div onMouseUp={()=>{setHover1(true)}} onMouseDown={()=>{setHover1(false)}} onMouseLeave={()=>{setHover1(false)}} onMouseEnter={()=>{setHover1(true)}} onClick={()=>{setLocalState(process("dislicked",ID))}} style={{backgroundColor:!Hover1?"#0000":LocalColor.backgroundActive,color:LocalState[1]?LocalColor.dislikeColor:LocalColor.textColor}} className='button'><AiFillDislike/></div>
            <div onMouseUp={()=>{setHover2(true)}} onMouseDown={()=>{setHover2(false)}} onMouseLeave={()=>{setHover2(false)}} onMouseEnter={()=>{setHover2(true)}} onClick={()=>{setLocalState(process("experienced",ID))}} style={{backgroundColor:!Hover2?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[2]?isGame?<IoIosPlay/>:<AiFillEye/>:isGame?<MdPlayDisabled/>:<AiFillEyeInvisible/>}</div>
            <div onMouseUp={()=>{setHover3(true)}} onMouseDown={()=>{setHover3(false)}} onMouseLeave={()=>{setHover3(false)}} onMouseEnter={()=>{setHover3(true)}} onClick={()=>{setLocalState(process("downloaded",ID))}} style={{backgroundColor:!Hover3?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[3]?<MdFileDownloadDone/>:<IoMdDownload/>}</div>
            <div onMouseUp={()=>{setHover4(true)}} onMouseDown={()=>{setHover4(false)}} onMouseLeave={()=>{setHover4(false)}} onMouseEnter={()=>{setHover4(true)}} onClick={()=>{setLocalState(process("bookmarked",ID))}}  style={{backgroundColor:!Hover4?"#0000":LocalColor.backgroundActive,color:LocalColor.textColor}} className='button'>{LocalState[4]?<BsBookmarkFill/>:<BsBookmark/>}</div>
        </div>
    )
}
