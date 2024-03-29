import React, { useContext, useState } from 'react'
import { Globals } from '../globals/Globals'
import { socket } from '../App';
import Colours from './Colours';

const Menu = () => {
  const {colorSaturation} = useContext(Globals);
  const {CurrentButtonColor} = useContext(Globals);

  const {AllRooms} = useContext(Globals) ; 
  const {username} = useContext(Globals);
  const {FinalNotifications} = useContext(Globals)
  const [menuO,SetMenu]=useState('Off')
  const {BgColor} =useContext(Globals)
  const {TextColor} =useContext(Globals)
  const JoinROOM = (room)=>{
    //console.log(room)
    localStorage.setItem('roomID',room);
    socket.emit("join_room",{'room':room,'username':username});
    window.location.href="/chat/"+room;
  }
  const handleOpen = () =>{
    SetMenu("Active")
  }
  const handleClose = () =>{
    SetMenu('Off')
  }
  return (
    <>
    <div onClick={handleOpen} className={`sm:hidden h-10 w-10 bg-white/90 
                          rounded-lg fixed top-5 left-3
                          flex items-center justify-center
                          bg-${CurrentButtonColor}-${colorSaturation}  hover:bg-slate-500 transition-colors
                          `}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 
      32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 
      32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 
      32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </div>

        <div className=' bg-[#00000064] z-[900]'>
          <div style={{ backgroundColor: BgColor }} className='fixed top-0 left-0 bottom-0 w-[20vw]
                            flex justify-start
                          items-center p-5 flex-col
                          gap-3 max-sm:hidden min-w-[200px] Menu-container
                          '>
            {(AllRooms.length === 0)?
            <div style={{ color: TextColor }} className={` text-lg`}>No Rooms</div>
            :
            <div></div>}
            {FinalNotifications.map((ele,index)=>{
              return(
                <div key={index} style={{ color: TextColor }} className={`w-[100%] gap-3  bg-[#0000009d] rounded-md relative`}>
                {ele.length===0 ? 
                  <div></div>
                  : 
                        <div className={`absolute h-5 w-5 rounded-full 
                        bg-blue-500 right-[-5px] top-[-5px] text-sm
                        text-center overflow-hidden
                              `} style={{ color: TextColor }}> 
                              {ele.length}
                    </div>}
                  <div style={{ color: TextColor }} className={` p-4 flex justify-between items-center`}>
                      <p className=' truncate'>{ele.room}</p>
                      <button onClick={() => JoinROOM(ele.room)} className={`px-4 py-2 
                        bg-${CurrentButtonColor}-${colorSaturation} w-[60px]  rounded-md 
                          hover: bg-${CurrentButtonColor}-${colorSaturation-100} transition-all
                          active: bg-${CurrentButtonColor}-200 
                          active:text-${CurrentButtonColor}-800 
                          active:opacity-[1]
                                    hover:opacity-[0.7]
                                  `}>

                          Join</button>
                  </div>
                  
                  </div>
              )
            })}
          </div>
        </div>


        <div className={
          `fixed top-0 left-0 bottom-0 w-full
          bg-[#161616d7] flex justify-start
           backdrop-blur-lg
          items-center p-5 flex-col
          gap-3  z-40 pt-11 transition-all sm:hidden
          ${menuO} overflow-y-auto
          `
        }>
            <div  className='h-4 w-7 scale-125 fill-[#ffffff] absolute top-4 right-3 ' onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 
                56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 
                427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 
                13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
            </div>
          {FinalNotifications.map((ele,index)=>{
            return(
              <div key={index} className='w-[100%]  bg-[#0000009d] px-[2vw]
               rounded-md relative'>
                {ele.length===0 ? 
                <></>
                : 
                      <div className={`absolute h-5 w-5 rounded-full 
                      bg-blue-500 right-[-5px] top-[-5px] text-sm
                      text-center
                            `} style={{ color: TextColor }}> 
                            {ele.length}
                  </div>}
                <div className={` p-4 flex justify-between items-center`} style={{ color: TextColor }}>
                    <p>{ele.room}</p>
                    <button onClick={()=>JoinROOM(ele.room)} className={`px-4 py-2  bg-${CurrentButtonColor}-${colorSaturation} 
                     w-[60px]  rounded-md 
                                hover: bg-${CurrentButtonColor}-${colorSaturation-100} transition-all
                                active: bg-${CurrentButtonColor}-200 
                                    active:text-${CurrentButtonColor}-800 
                                    active:opacity-[1]
                                    hover:opacity-[0.8]
                                   
                                    `} >
                        Join</button>
                </div>
                
                </div>
            )
          })}
        </div>
        <Colours/>
    </>
  )
}

export default Menu