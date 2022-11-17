import React,{useState} from 'react'
import "../style/components/CheckMark.scss"

export default function CheckMark({defaultValue,onChange}) {
  const [Value,setValue]=useState(defaultValue)
  return (
    <div className={`CheckMark-otter ${Value?"onBg":"offBg"}`} onClick={()=>{setValue(!Value);onChange(!Value)}}>
      <div className={`CheckMark-inner ${Value?"onInner":""}`}></div>
    </div>
  )
}
