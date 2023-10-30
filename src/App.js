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
import Menu from './components/Menu';
import Login from './components/Login';
import Redirect from './components/Redirect';
import GetNotification from './components/GetNotification';
const router = createBrowserRouter([
  {
    path : '/',
    element:
    <>
      {localStorage.getItem('ISloggedIN')?
      <Redirect/>
        :
      <Login/>
      }
    </>
  },
  {
    path : '/next',
    element: 
    <>
      <Login/>
    </>
  },
  {
    path : '/o',
    element: 
    <>
      <Menu/>
      <Join/>
    </>
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
  const apiURl = 'https://chat-server-backend-sockets.onrender.com'
//  const apiURl = "http://localhost:10209"
  const [username,setUsername] = useState(localStorage.getItem("username")||"");
  const [roomID,setRoomID] = useState(localStorage.getItem("roomID")||"");
  const [newMessage,setNewMessage] = useState("");
  const [IsOnline,changeStatus]  = useState(false);
  const [AllMessages,addMessages] = useState(localStorage.getItem("Allmessages")||[])
  const [AllRooms,setAllRooms] = useState(localStorage.getItem('Allrooms')||[]);
  const [saverModeOn,changeSavermode] = useState(localStorage.getItem('isSaverOff')||true)
  const [LocalDataOnNotifications , updateLocalnotifiation] = useState(JSON.parse(localStorage.getItem('_Local_Notifications_'))||[])
  const [NotificationArray , UpdateNotifaction] = useState([]);
  const [FinalNotifications , UpdateFinalNotifaction] = useState([]);
  //const URL = "http://localhost:10209" 
  const URL = "https://chat-server-backend-sockets.onrender.com"

  useEffect(()=>{
    axios.get(apiURl)
      .then((res)=>{
       // console.log(res.data)
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
            URL,
            AllRooms,
            setAllRooms,
            LocalDataOnNotifications,
            updateLocalnotifiation,
            NotificationArray,
            UpdateNotifaction,
            FinalNotifications,
            UpdateFinalNotifaction
            }}>
            <RouterProvider router={router} />
            <GetNotification/>
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
export const socket = io.connect("https://chat-server-backend-sockets.onrender.com/");
//export const socket = io.connect("http://localhost:10209/");