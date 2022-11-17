import React,{useState} from 'react'
import ListSelector from "../components/ListSelector"
import colors from "../style/colors"
import MovieListPage from './MovieListPage'


export default function SavedPage({DarkMode}) {
  const [Selected,setSelected] = useState(null)
  const lists=["licked","downloaded","experienced","bookmarked"]
  const LocalColor=DarkMode?colors.dark:colors.light
  if(Selected!=null)
    return <MovieListPage setList={()=>{setSelected(null)}} DarkMode={DarkMode} list={Selected}/>
  return (
    <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
      <div className='screenInner'>
        {lists.map((it,i)=><ListSelector  DarkMode={DarkMode} setSelected={setSelected} index={i} key={i} text={it}/>)}
      </div>
    </div>
  )
}
