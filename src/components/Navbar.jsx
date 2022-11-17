import React,{useState} from 'react'
import "../style/components/navbar.scss"
import colors from "../style/colors"

function hover(index,value,hovers){
  let arr=JSON.parse(JSON.stringify(hovers))
  arr[index]=value
  return arr
}

export default function Navbar({DarkMode,CurrentPage,setCurrentPage}) {
  const buttons=["Home","Browse","Bookmarks","Settings"]
  const [Open,setOpen]=useState(false)
  const LocalColor=DarkMode?colors.dark:colors.light
  const [HoversDesktop,setHoversDesktop]=useState([false,false,false,false])
  const [HoversMobile,setHoversMobile]=useState([false,false,false,false])
  const [HoverOpenBTN,setHoverOpenBTN]=useState(false)
  return (
    <div style={{color:LocalColor.textColor,backgroundColor:LocalColor.navBackgroundcolor,borderBottom:`2px solid ${LocalColor.borderColor}`}} className="navbarContainer">
      <div className='navbarContainerInner'>
        {buttons.map((it,i)=><button onMouseUp={()=>{setHoversDesktop(hover(i,true,HoversDesktop))}} onMouseDown={()=>{setHoversDesktop(hover(i,false,HoversDesktop))}} onMouseLeave={()=>{setHoversDesktop(hover(i,false,HoversDesktop))}} onMouseEnter={()=>{setHoversDesktop(hover(i,true,HoversDesktop))}}  key={i} onClick={()=>{setCurrentPage(i);setOpen(false)}} style={{backgroundColor:!HoversDesktop[i]?"#0000":LocalColor.backgroundActive,userSelect:"none",color:LocalColor.textColor}} className="NavLinkDesktop">{it}</button>)}
        <button style={{backgroundColor:!HoverOpenBTN?"#0000":LocalColor.backgroundActive,userSelect:"none"}} onMouseUp={()=>{setHoverOpenBTN(true)}} onMouseDown={()=>{setHoverOpenBTN(false)}} onMouseLeave={()=>{setHoverOpenBTN(false)}} onMouseEnter={()=>{setHoverOpenBTN(true)}} onClick={()=>{setOpen(!Open)}} className={`${DarkMode?"mobileMenuButtonDark":"mobileMenuButtonLight"}`}>
          <div className={`layout_nav_mobile_btn ${Open?"layout_nav_mobile_btn_open":""}`}>
            <div style={{backgroundColor:LocalColor.borderColor}} className={`line ${Open?"nav-first-line":""}`}></div>
            <div style={{backgroundColor:LocalColor.borderColor}} className={`line ${Open?"nav-hide":""}`}></div>
            <div style={{backgroundColor:LocalColor.borderColor}} className={`line ${Open?"nav-last-line":""}`}></div>
          </div>
        </button>
      </div>
      <div onClick={()=>{setOpen(false)}} className={`mobile-cover ${Open?"mobile-cover-open":""}`}></div>
      <div className={`menuMobileContainer ${DarkMode?"menuMobileContainerDark":"menuMobileContainerLight"} ${Open?"menuMobileContainerOpen":""}`}>
        {buttons.map((it,i)=><button onMouseUp={()=>{setHoversDesktop(hover(i,true,HoversDesktop))}} onMouseDown={()=>{setHoversDesktop(hover(i,false,HoversDesktop))}} onMouseLeave={()=>{setHoversMobile(hover(i,false,HoversDesktop))}} onMouseEnter={()=>{setHoversMobile(hover(i,true,HoversDesktop))}} key={i} style={{backgroundColor:!HoversMobile[i]?"#0000":LocalColor.backgroundActive,userSelect:"none",color:LocalColor.textColor}} onClick={()=>{setCurrentPage(i);setOpen(false)}} className="NavLinkMobile">{it}</button>)}
      </div>
    </div>
  )
}
