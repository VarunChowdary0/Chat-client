import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from './components/Chat';
import { Globals } from "./globals/Globals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Join from './components/Join';
import axios from 'axios'
import { DotWave } from '@uiball/loaders'
const router = createBrowserRouter([
  {
    path : '/',
    element: <Join/>
  },
  {
    path:'/chat',
    element:
    <>
      <Chat/>
    </>
  }
]);

export default function App() {
  const apiURl = 'https://chat-server-backend-sockets.onrender.com/'
  const [username,setUsername] = useState(localStorage.getItem("username")||"");
  const [roomID,setRoomID] = useState(localStorage.getItem("roomID")||"");
  const [newMessage,setNewMessage] = useState("");
  const [IsOnline,changeStatus]  = useState(false);
  const [AllMessages,addMessages] = useState(localStorage.getItem("Allmessages")||[])
  const [saverModeOn,changeSavermode] = useState(localStorage.getItem('isSaverOff')||true)
  
  const URL = "http://192.168.61.79:10201";
  useEffect(()=>{
    axios.get(apiURl)
      .then((res)=>{
        console.log(res.data)
        changeStatus(true)
      })
      .catch((err)=>{
        console.log("Not online yet")
      })
  } ,[])

  return (
    <>
          {IsOnline ? 
          <Globals.Provider value={{
            socket,
            username,
            setUsername,
            roomID,
            setRoomID,
            newMessage,
            setNewMessage,
            AllMessages,
            addMessages,
            saverModeOn,
            changeSavermode,
            URL
            }}>
            <RouterProvider router={router} />
            </Globals.Provider>
    :
          <div className='w-full h-screen flex flex-col justify-center
                             items-center bg-black text-white space-y-6'>
            <DotWave  size={70} color="#ffff" />
            <p>connecting...</p>
          </div>
        }
    </>
    
    
  )
}
//export const socket = io.connect("https://chat-server-backend-sockets.onrender.com/");
export const socket = io.connect("http://192.168.61.79:10201/");