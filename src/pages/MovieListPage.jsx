import React from 'react'
import colors from "../style/colors"
import UniversalBackBTN from '../components/UniversalBackBTN'
import getAllMovieData from "../scripts/api/getAllMovieData"
import { useEffect } from 'react'
import { useState } from 'react'
import MovieListItem from '../components/MovieListItem'
import "../style/pages/MovieListPage.scss"
import MoviePage from "./MoviePage"

function getTypeStr(type){
  if(type==0)
    return "licked"
  if(type==1)
    return "downloaded"
  if(type==2)
    return "experienced"
  if(type==3)
    return "bookmarked"
  throw "invalid select in getAllMovieData"
}

function processClearAll(list,setMovieList){
  if(window.confirm("Are you sure you want to delete all items?")){
    let key=""
    if(list==0)
      key="licked"
    if(list==1)
      key="downloaded"
    if(list==2)
      key="experienced" 
    if(list==3)
      key="bookmarked"
    localStorage.setItem(key,"[]")
    setMovieList([])
  }
}

function deleteItemID(type,id,setMovieList,list){
  if(window.confirm("Are you sure you want to delete this item?")){
    let str=getTypeStr(type)
    let data =JSON.parse(localStorage.getItem(str))
    data=data.filter((it,i)=>it!==id)
    localStorage.setItem(str,JSON.stringify(data))
    getAllMovieData(setMovieList,type)
  }
}


export default function ListPage({DarkMode,list,setList}) {
    const LocalColor=DarkMode?colors.dark:colors.light
    const [MovieList,setMovieList]=useState(null)
    const [SelectedMovie,setSelectedMovie]=useState(null)
    useEffect(()=>{
      getAllMovieData(setMovieList,list)
    },[])
    if(SelectedMovie!=null)
      return <MoviePage ID={SelectedMovie} DarkMode={DarkMode} setSelected={setSelectedMovie}/>
    if(MovieList==null||MovieList.length==0)
      return (
        <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
          <UniversalBackBTN onBack={()=>{setList(null)}} DarkMode={DarkMode}/>
          <div className='screenInner'>
            <h1 className='errorTextListPage' style={{color:LocalColor.textColor}}>{MovieList==null?"Loading...":"No Items In This List!"}</h1>
          </div>
        </div>
      )
      return (
        <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
          <UniversalBackBTN onBack={()=>{setList(null)}} DarkMode={DarkMode}/>
          <div className='clear-div'>
            <div onClick={()=>{processClearAll(list,setMovieList)}} style={{backgroundColor:LocalColor.deleteBtnColor}}>
              <h2 style={{color:colors.dark.textColor}}>CLEAR ALL</h2>
            </div>
            
          </div>
          <div className='screenInner screenInnerListPage scroll pb-n'>
            <div className='listContainer'>
              {MovieList.map((it,i)=><MovieListItem setMovieList={setMovieList} list={list} deleteItemID={deleteItemID} setSelected={setSelectedMovie} DarkMode={DarkMode} item={it} index={i} key={i}/>)}
            </div>
          </div>
        </div>
      )
}
