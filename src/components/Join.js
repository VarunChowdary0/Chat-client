import React, { useContext , useEffect, useState} from 'react'
import { Globals } from '../globals/Globals';
import { socket } from '../App';
import axios from 'axios';
import Settings from './Settings';

const Join = () => {
    const {username} = useContext(Globals);
    const {BgColor} =useContext(Globals)
    const {TextColor} =useContext(Globals)
    const {roomID,setRoomID} =  useContext(Globals);
    const {URL} = useContext(Globals)
    const [showIT,setShow] = useState(false); 
    const {setAllRooms} = useContext(Globals)
    const {ShowSettings,ToggleSettings} =useContext(Globals);
    
    const JoinRoom = () => {
      if(username.trim()!=="" && roomID.trim()!==""){
            axios.get(URL+'/Add_a_room',{params : {
              'username':username.trim(),
              'room':roomID.trim()
            }})
              .then((res)=>{
               // console.log(res)
                socket.emit("join_room",{'room':roomID.trim(),'username':username.trim()});
                window.location.href="/chat";
              })
              .catch((err)=>{
                console.log("Error to Add room",err)
              })
      }
    }

    const handleRoomID = (event)=>{
      setRoomID(event.target.value)
      localStorage.setItem('roomID',event.target.value)
    }



  useEffect(()=>{
      axios.get(URL + "/get_all_rooms", { params: {'username':username} })
                  .then((res) => {
                    AllRoomADD(res.data['Data'])
                  })
                  .catch((err) => {
                      console.log("Error: ", err);
                  })
  },[])
  const AllRoomADD = (data)=>{
    setAllRooms(data)
  }
  const handleShow=()=>{
    setShow(true);
  }
  const HandleSetting = () =>{
      ToggleSettings(true);
  } 
  const openTheUpdates = ()=>{
      localStorage.setItem('roomID',"Phsdvjbk00");
      window.location.href='/chat'
  } 

  const handleKeyDown = (event)=>{
    if(event.key === 'Enter'){
      JoinRoom();
    }
}
    return (
      <div style={{ backgroundColor: BgColor }} className={`flex h-screen justify-center items-center`} >
        <div style={{ color: TextColor }} className={`fixed top-10 right-[0px] mr-[100px] text-lg ]
                          max-sm:w-[200px] max-sm:pl-8
        `}>
        
          <span className=' text-yellow-300'>Me</span> : {username}
          </div>
        <div className='fill-white fixed top-[100px] right-8' onClick={()=>{
          localStorage.clear();
          window.location.href='/'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3
             0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 
             0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 
             32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 
             0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 
             14.3-32 32-32l64 0z"/></svg>
        </div>
        <div className="h-[50vh] w-[30vw] bg-black/30 relative max-sm:w-[80vw]
                    max-lg:w-[50vw] max-sm:h-[35vh]
                    max-md:ml-[100px]
                    max-sm:ml-0
                rounded-md flex flex-col p-5 space-y-7"> 
      
              <div className='flex justify-around items-center gap-2'>
                <div style={{ color: TextColor }} onClick={handleShow} className={`h-[150px] w-[150px] bg-green-500 flex 
                                justify-center items-center text-xl 
                                rounded-lg  hover:bg-green-700 
                                hover:cursor-pointer max-sm:w-[120px]  max-sm:h-[120px]
                                transition-all`}>
                  Join a Room
                </div>
                <div style={{ color: TextColor }} onClick={handleShow} className={`h-[150px] w-[150px] bg-green-500 flex 
                                justify-center items-center text-xl 
                                rounded-lg  max-sm:w-[120px]
                                hover:cursor-pointer  max-sm:h-[120px]  max-sm:pl-4
                                hover:bg-green-700 transition-all`}>
                  Create a Room
                </div>
              </div>
                <div className='w-full py-5 flex justify-center pt-11 items-center'>
                 {showIT ? 
                      <>
                     <div className=' flex justify-center items-center gap-2 w-full'>
                      <input className='h-10 pl-4 focus:outline-none rounded-md flex justify-center' 
                        value={roomID} placeholder='Room ID'
                        onChange={handleRoomID} onKeyDown={handleKeyDown}/>
                        <button className='px-4 py-2 bg-green-500 w-[100px]  
                                 rounded-md 
                                hover:bg-green-600 transition-all
                                active:bg-green-200
                                  active:text-green-800'
                        onClick={JoinRoom}>
                          Continue
                        </button>
                     </div>
                      </>
                 :  
                      <div></div>
                }
                </div>

              <div className='h-fit w-[350px] bg-white fixed
                            bottom-9 right-7 rounded-xl px-3 py-5
                            overflow-hidden hover:cursor-pointer
                            max-sm:w-[200px] max-sm:w-[85vw] overflow-y-auto
                            max-sm:h-[25vh] max-sm:text-sm max-sm:max-w-[400px]
                        '>
                  <div className='flex flex-col space-y-3' >
                    <li><span className='t text-green-600'>STEP 1 : </span>Change or add username</li>
                    <li><span className='t text-green-600'>STEP 2 : </span>To create a room Add roomID</li>
                    <li><span className='t text-green-600'>STEP 3 : </span>TO join a room enter roomID</li>
                    <li><span className='t text-green-600'>Notice : </span>Click on the
                     link to Know more <span onClick={openTheUpdates} 
                     className=' px-[100px] text-green-400'>UPDATES</span>
                     </li>
                  </div>
              </div>
        </div>
        <div onClick={()=>HandleSetting()} className=' fill-white scale-150 fixed top-12 hover:cursor-pointer 
                          right-6  active:rotate-180 transition-all'>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" 
        viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 
        24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 
        39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 
        8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 
        10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28
         3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 
         425.9c-8.8 2.8-18.6 
         .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 
         6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 
         191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 
         22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 
         18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 
         6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 
         8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg> 
        </div>

        {
          (ShowSettings) ? 
            <Settings/>
          :
          <div></div>
        }

      </div>
    )
  }

export default Join