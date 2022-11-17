import React from 'react'
import colors from "../style/colors"

function getRatingColor(value){
    let rating=null
    if(value.includes("%"))
        rating=parseInt(value.split("%")[0])
    else if(value.includes("/"))
        rating=Math.floor((parseInt(value.split("/")[0])/parseInt(value.split("/")[1]))*100)
    else
        throw "invalid rating value"
    if(rating>75)
        return "#2fa32a"
    else if(rating>50)
        return "#c8bb1c"
    else
        return "#901010"
}

function getRateingValue(value){
    if(value.includes("%"))
        return  Math.floor(parseInt(value.split("%")[0]))/10
    else if(value.includes("/"))
        return  Math.floor((parseInt(value.split("/")[0])/parseInt(value.split("/")[1]))*100)/10
    else
        throw "invalid rating value"
}

export default function MovieReviewDisplay({rating,index,DarkMode}) {
    console.log(rating);
    const color=getRatingColor(rating.Value)
    const value=getRateingValue(rating.Value)
    let source=rating.Source
    const LocalColor=DarkMode?colors.dark:colors.light
    if(source==="Internet Movie Database")
        source="IMDB"
    return (
        <div style={{borderTop:index==0?"none":`1px solid ${LocalColor.borderColor}`}} className='rateingContainer'>
            <h3 style={{color:LocalColor.textColor}}>{source}</h3>
            <div className='valueDiv' style={{backgroundColor:color}}><h1 style={{color:colors.dark.textColor}}>{value}</h1></div>
        </div>
    )
}
