import React,{useState,useEffect} from 'react'
import "../style/pages/SearchPage.scss"
import getSearchResoults from "../scripts/api/getSearchResoults"
import MoviePage from './MoviePage'
import MovieItem from '../components/MovieItem'
import colors from "../style/colors"

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

async function getResoults(Input,setSearchList){
  if(isBlank(Input)){
    setSearchList([])
    return
  }
  const res= []
  try{
    for(let it of (await getSearchResoults(Input,1)).Search)
      res.push(it)
  }catch(e){}
  try{
    for(let it of (await getSearchResoults(Input,2)).Search)
      res.push(it)
  }catch(e){}
  try{
    for(let it of (await getSearchResoults(Input,3)).Search)
      res.push(it)
  }catch(e){}
  if(res==undefined)
    setSearchList([])
  else
    setSearchList(res)
}

export default function SearchPage({DarkMode}) {
  const [Input,setInput]=useState("")
  const [SearchList,setSearchList]=useState([])
  const [Selected,setSelected]=useState(null)
  const [IsFocused,setIsFocused]=useState(false)
  const LocalColor=DarkMode?colors.dark:colors.light
  //todo fix not resoults when search
  useEffect(()=>{
    const timer = setTimeout(() => {
      console.log(Input);
      getResoults(Input,setSearchList)
    }, 500)
    return () => clearTimeout(timer)
  },[Input])
  if(Selected!=null)
    return <MoviePage DarkMode={DarkMode} setSelected={setSelected} ID={Selected}/>
  return (
    <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
      <div className='screenInner pb-n'>
        <input placeholder='Search For Entertaimment' onBlur={(e)=>{setIsFocused(false)}} onFocus={(e)=>{setIsFocused(true)}} style={{backgroundColor:IsFocused?DarkMode?"#fff2":"#0002":"#0000",border:`2px solid ${LocalColor.borderColor}`,color:LocalColor.textColor}} className="SearchInput" type="text" value={Input} onChange={(e)=>{setInput(e.target.value)}}/>
        <div className="resoultsError" style={{display:isBlank(Input)||SearchList.length==0?"flex":"none"}}>
          <h1 style={{color:LocalColor.textColor}}>{isBlank(Input)?"":"No Resoults Found!"}</h1>
        </div>
        <div className='SearchDiv scroll'>
          {SearchList.map((it,i)=><MovieItem key={i} id={it.imdbID} movie={it} setSelected={setSelected}/>)}
        </div>
      </div>
    </div>
  )
}
