import React from 'react'
import "../style/pages/HomePage.scss"
import colors from "../style/colors"
import { useEffect,useState } from 'react';
import getAllMovieData from '../scripts/api/getAllMovieData'
import Label from "../components/Label"
import getSearchResults from "../scripts/api/getSearchResoults"
import isPosterValid from '../scripts/isPosterValid';
import RecomandedShowcase from "../components/RecomandedShowcase"
import MoviePage from "./MoviePage"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomFromData(data,buffer){
  const res={
    word:"",
    type:"",
    id:"",
    like:""
  }
  const commonWords = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"];
  const selectedItem = data[Math.floor(Math.random() * (data.length))];
  let word=(selectedItem.Title.split(" ")).filter((it,i)=>it.length>=3)
  word=word[Math.floor(Math.random() * (word.length))]
  res.word=word
  res.type=selectedItem.Type
  res.id=selectedItem.imdbID
  res.like=selectedItem.Title
  if(commonWords.includes(res.word.toLowerCase()))
    return undefined
  for(let it of buffer)
    if(it!=undefined&&(res.type===it.type&&(res.word===it.word||res.id===it.id)))
      return undefined  
  return res
}



async function getRecommended(setRecomanded,count){
  let data=await getAllMovieData(()=>{},4)
  let buffer=[]
  let i=0
  while(true){
    i+=1;
    buffer.push(getRandomFromData(data,buffer))
    if(buffer.length>count||i>1000)
      break
  }
  buffer=buffer.filter((item,i)=>item!=undefined)
  setRecomanded(buffer)
}

async function getRecomandedItems(data){
  try{
    let res=await getSearchResults(data.word,null,data.type)
    const disliked=JSON.parse(await localStorage.getItem("dislicked"))
    let retValue=res.Search
    retValue=retValue.filter((it,i)=>!disliked.includes(it.imdbID))
    retValue=retValue.filter((it,i)=>it.Title!=data.like)
    retValue=retValue.filter((it,i)=>!isPosterValid(it.Poster))
    return retValue
  }catch(e){
    return null
  }
}

async function getRecommendedItemsAll(Recomanded,setRecomandedData){
  let retValue=[]
  for(let it of Recomanded)
    retValue.push(await getRecomandedItems(it))
  setRecomandedData(retValue)
} 

function getEffectiveCount(arr){
  let count=0
  try{
    for(let it of arr)
      if(it!=null)
        count+=1 
  }catch(e){}
  return count
}


export default function HomePage({DarkMode}) {
  const LocalColor=DarkMode?colors.dark:colors.light
  const [RecomandedData,setRecomandedData]=useState(null)
  const [Recomanded,setRecomanded]=useState([])
  const [selectedItem,setSelectedItem]=useState(null)
  useEffect(()=>{
    getRecommended(setRecomanded,6) 
  },[])
  useEffect(()=>{
    if(Recomanded.length>0)
      getRecommendedItemsAll(Recomanded,setRecomandedData)
  },[Recomanded])
  if(selectedItem!=null)
    return <MoviePage ID={selectedItem} DarkMode={DarkMode} setSelected={setSelectedItem}/>
  return (
    <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
      <div style={{backgroundColor:LocalColor.brandColor,borderBottomColor:LocalColor.borderColor}} className="banner-home">
        <h1 style={{color:colors.dark.textColor}}>OMDB</h1>
        <p style={{color:colors.dark.textColor}}>The OMDb API is a RESTful web service to obtain movie information.This app is an implementation of this API!</p>
      </div>
      <div className='screenInner home-container scroll pb-n'>
        <div className="textRecomanded" style={{display:(getEffectiveCount(RecomandedData)>0&&Recomanded.length>0)?"none":"flex"}}>
          <h2 style={{color:LocalColor.textColor}}>Use the app more to see Recomandations.</h2>
        </div>
        {RecomandedData!=null?Recomanded.map((item,i)=>(RecomandedData[i]!=null?(<div className='RecomandedContainer' key={i}>
          <Label DarkMode={DarkMode} Text={`${item.type=="series"?"TV Show":capitalizeFirstLetter(item.type)}s like ${item.like}`}/>
          <RecomandedShowcase Items={RecomandedData[i]} setSelected={setSelectedItem} DarkMode={DarkMode} data={item} index={i}/>
        </div>):<div key={i}></div>)):<div></div>}
        <div></div>
      </div>
    </div>
  )
}
