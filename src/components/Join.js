import React, { useContext , useEffect, useState} from 'react'
import { Globals } from '../globals/Globals';
import { socket } from '../App';
const Join = () => {
    const {username,setUsername} = useContext(Globals);
    const {roomID,setRoomID} =  useContext(Globals);
    const {saverModeOn,changeSavermode} = useContext(Globals);
    const JoinRoom = () => {
      if(username.trim()!=="" && roomID.trim()!==""){
            socket.emit("join_room",{'room':roomID,'username':username});
            window.location.href="/chat";
      }
    }
    const handleUsername = (event)=>{
      setUsername(event.target.value)
      localStorage.setItem("username",event.target.value);
    }
    const handleRoomID = (event)=>{
      setRoomID(event.target.value)
      localStorage.setItem('roomID',event.target.value)
    }


  useEffect(() => {
    console.log("local: ", localStorage.getItem('saver'));
  }, []);

  const offSaver=()=>{
    changeSavermode(false)
    localStorage.setItem('isSaverOff',false)
  }
  const onSaver=()=>{
    changeSavermode(true)
    localStorage.setItem('isSaverOff',true)
  }
    return (
      <div className='flex h-screen justify-center items-center bg-[#2f2f31]' >
        {saverModeOn ? 
         <div onClick={offSaver} className='px-2 py-2 rounded-full bg-yellow-500 
         fixed top-8 right-6 text-white scale-60
         shadow-lg hover:cursor-pointer
         '>
      OFF</div>
        :
        <div onClick={onSaver} className='px-2 py-4 rounded-full bg-green-600 
                    fixed top-8 right-6 text-white scale-60
                    shadow-lg hover:cursor-pointer
                    '>
              saver</div>
        }
        <div className="h-[40vh] w-[30vw] bg-black/30 relative max-sm:w-[80vw]
                          max-lg:w-[60vw]
                        rounded-md flex flex-col p-5 space-y-7">
          <h1 className='text-white text-2xl text-center'>Join a Chat</h1>
          <input className='h-10 pl-4 focus:outline-none rounded-md' 
                                value={username} placeholder='Your name..' 
                                onChange={handleUsername}/>
          <input className='h-10 pl-4 focus:outline-none rounded-md' 
                                value={roomID} placeholder='Room ID'
                                onChange={handleRoomID}/>
          <button className='px-4 py-2 bg-green-500 w-[100px] 
                              absolute bottom-10 right-6 rounded-md 
                              hover:bg-green-600 transition-all
                               active:bg-green-200
                                active:text-green-800'
            onClick={JoinRoom} >
                      Join</button>

              <div className='h-fit w-[320px] bg-white fixed
                                bottom-9 right-7 rounded-xl px-3 py-5
                                overflow-hidden hover:cursor-pointer
                                max-sm:w-[200px]
                        '>
                  <div className='flex flex-col space-y-3' >
                    <li><span className='t text-green-600'>STEP 1 : </span>Change or add username</li>
                    <li><span className='t text-green-600'>STEP 2 : </span>To create a room Add roomID</li>
                    <li><span className='t text-green-600'>STEP 3 : </span>TO join a room enter roomID</li>
                    <li><span className='t text-green-600'>STEP 4 : </span>Use saver-mode for quick response</li>
                  </div>
                  {/* <div className='h-10 w-10 rounded-full bg-green-950 absolute left-0 opacity-0
                                  hover:scale-[15] transition-all hover:opacity-100
                  '         >
                  </div> */}
              </div>
        </div>
      </div>
    )
  }

export default Join