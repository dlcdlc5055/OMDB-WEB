import React,{useState,useEffect} from 'react'
import getMovieByID from "../scripts/api/getMovieByID"
import colors from "../style/colors"
import UniversalBackBTN from "../components/UniversalBackBTN"
import "../style/pages/MoviePage.scss"
import Label from "../components/Label"
import MoviePageButtons from "../components/MoviePageButtons"
import MovieReviewDisplay from "../components/MovieReviewDisplay"
import MoviePageDataDysplayElement from "../components/MoviePageDataDysplayElement"

async function getData(id,setData){
    setData(await getMovieByID(id, true))
}

export default function MoviePage({ID,setSelected,DarkMode}) {
    const [MovieData,setMovieData]=useState(null)
    const LocalColor=DarkMode?colors.dark:colors.light
    useEffect(()=>{
        getData(ID,setMovieData)
    },[])
    const img_w=131
    const img_h=1.4833333333333334
    console.log(MovieData);
    const labelMainSize=20
    if(MovieData==null)
        return <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen"></div>
    const Ratings=MovieData.Ratings
    return (
        <div style={{backgroundColor:LocalColor.gloalBackgroundcolor}} className="screen">
            <UniversalBackBTN onBack={()=>{setSelected(null)}} DarkMode={DarkMode}/>
            <div className='screenInner pb-n'>
                <div style={{backgroundColor:LocalColor.standardBackgroundcolor}} className='MoviePageMainContainer'>
                    <img className='moviePageImage' draggable="false" style={{border:`2px solid ${LocalColor.borderColor}`,width:img_w,height:img_w*img_h}} src={MovieData.Poster}/>
                    <div className='container' style={{border:`2px solid ${LocalColor.borderColor}`,backgroundColor:LocalColor.secundaryBackgroundcolor}}>
                        <div>
                          <Label DarkMode={DarkMode} Text={"Title"} Size={labelMainSize}/>
                          <h4 style={{color:LocalColor.textColor}}>{MovieData.Title}</h4>
                        </div>
                        <div>
                          <Label DarkMode={DarkMode} Text={"Release Date"} Size={labelMainSize}/>
                          <h4 style={{color:LocalColor.textColor}}>{MovieData.Released}</h4>
                        </div>
                        <div>
                          <Label DarkMode={DarkMode} Text={"Type"} Size={labelMainSize}/>
                          <h4 style={{color:LocalColor.textColor}}>{MovieData.Type}</h4>
                        </div>
                    </div>
                    <MoviePageButtons Data={MovieData} Vertical={true} ID={ID} DarkMode={DarkMode}/>
                </div>
                <MoviePageButtons Data={MovieData} Vertical={false} ID={ID} DarkMode={DarkMode}/>
                <div className='content_global_movie_page scroll'>
                    <div style={{border:`2px solid ${LocalColor.borderColor}`}} className='container'>
                        <div className='gridDisplay'>
                            <MoviePageDataDysplayElement Value={["Runtime",MovieData.Runtime]} DarkMode={DarkMode}/>
                            <MoviePageDataDysplayElement Value={["Genre",MovieData.Genre]} DarkMode={DarkMode}/>
                            <MoviePageDataDysplayElement Value={["Language",MovieData.Language]} DarkMode={DarkMode}/>
                            <MoviePageDataDysplayElement Value={["Country",MovieData.Country]} DarkMode={DarkMode}/>
                            <MoviePageDataDysplayElement Value={["Awards",MovieData.Awards]} DarkMode={DarkMode}/>
                            <MoviePageDataDysplayElement Value={["Actors",MovieData.Actors]} DarkMode={DarkMode}/>
                        </div>
                        <MoviePageDataDysplayElement Value={["Description",MovieData.Plot]} DarkMode={DarkMode}/>
                    </div>
                    <div style={{border:`2px solid ${LocalColor.borderColor}`}} className='container'>
                        {Ratings.map((it,i)=><MovieReviewDisplay DarkMode={DarkMode} rating={it} index={i} key={i}/>)}
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
