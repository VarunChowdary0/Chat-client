import React, { useContext , useEffect, useState} from 'react'
import { Globals } from '../globals/Globals';
import { socket } from '../App';
import axios, { all } from 'axios';

const Join = () => {
    const {username,setUsername} = useContext(Globals);
    const {roomID,setRoomID} =  useContext(Globals);
    const {saverModeOn,changeSavermode} = useContext(Globals);
    const {URL} = useContext(Globals)
    const [showIT,setShow] = useState(false); 
    const {setAllRooms} = useContext(Globals)
    
    const JoinRoom = () => {
      if(username.trim()!=="" && roomID.trim()!==""){
            axios.get(URL+'/Add_a_room',{params : {
              'username':username,
              'room':roomID
            }})
              .then((res)=>{
               // console.log(res)
                socket.emit("join_room",{'room':roomID,'username':username});
                window.location.href="/chat";
              })
              .catch((err)=>{
                console.log("Error to Add room",err)
              })
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


  // useEffect(() => {
  //   console.log("local: ", localStorage.getItem('saver'));
  // }, []);

  const offSaver=()=>{
    changeSavermode(false)
    localStorage.setItem('isSaverOff',false)
  }
  const onSaver=()=>{
    changeSavermode(true)
    localStorage.setItem('isSaverOff',true)
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
    //console.log("opooas")
    setShow(true);
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
        <div className='fixed top-10 right-[0px] mr-[100px] text-lg text-white
                          max-sm:w-[200px]
        '>
        
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
          {/* <input className='h-10 pl-4 focus:outline-none rounded-md' 
                                value={username} placeholder='Your name..' 
                                onChange={handleUsername}/>
           */}
              <div className='flex justify-around items-center'>
                <div onClick={handleShow} className='h-[150px] w-[150px] bg-green-500 flex 
                                justify-center items-center text-xl 
                                rounded-lg text-white hover:bg-green-700 
                                hover:cursor-pointer max-sm:w-[120px]  max-sm:h-[120px]
                                transition-all'>
                  Join a Room
                </div>
                <div onClick={handleShow} className='h-[150px] w-[150px] bg-green-500 flex 
                                justify-center items-center text-xl 
                                rounded-lg text-white  max-sm:w-[120px]
                                hover:cursor-pointer  max-sm:h-[120px]  max-sm:pl-4
                                hover:bg-green-700 transition-all'>
                  Create a Room
                </div>
              </div>
                <div className='w-full py-5 flex justify-center pt-11 items-center'>
                 {showIT ? 
                      <>
                     <div className=' flex justify-center items-center gap-2 w-full'>
                      <input className='h-10 pl-4 focus:outline-none rounded-md flex justify-center' 
                        value={roomID} placeholder='Room ID'
                        onChange={handleRoomID}/>
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

              <div className='h-fit w-[320px] bg-white fixed
                            bottom-9 right-7 rounded-xl px-3 py-5
                            overflow-hidden hover:cursor-pointer
                            max-sm:w-[200px] max-sm:w-[85vw]  
                            max-sm:h-[25vh] max-sm:text-sm max-sm:max-w-[400px]
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