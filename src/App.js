import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
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
import Colours from './components/Colours';
import ChatByLink from './components/ChatByLink';
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
    {localStorage.getItem('ISloggedIN')?
      <>
        <GetNotification/>
        <Menu/>
        <Join/>
      </>
      :
      <Login/>
    }
  </>
   
  }
  ,{
    path:'/chat/:id',
    element:
    <>
      <ChatByLink id={':id'} />
    </>
  }
]);

export default function App() {
  const apiURl = 'https://chat-server-backend-sockets.onrender.com'
 // const apiURl = "http://localhost:10209"
  const [username,setUsername] = useState(localStorage.getItem("username")||"");
  const [roomID,setRoomID] = useState(localStorage.getItem("roomID")||"");
  const [newMessage,setNewMessage] = useState("");
  const [BgColor,setBgColor] = useState(localStorage.getItem('bgCol')||"#2f2f31")
  const [TextColor,setTextColor] = useState(localStorage.getItem('TxtCol')||"#fff")
  const [IsOnline,changeStatus]  = useState(false);
  const [AllMessages,addMessages] = useState(localStorage.getItem("Allmessages")||[])
  const [AllRooms,setAllRooms] = useState(localStorage.getItem('Allrooms')||[]);
  const [saverModeOn,changeSavermode] = useState(localStorage.getItem('isSaverOff')||true)
  const [LocalDataOnNotifications , updateLocalnotifiation] = useState(JSON.parse(localStorage.getItem('_Local_Notifications_'))||[])
  const [NotificationArray , UpdateNotifaction] = useState([]);
  const [FinalNotifications , UpdateFinalNotifaction] = useState([]);
  const [ShowSettings,ToggleSettings] = useState(false);
  const [CurrentButtonColor,setCurrentButtonColor] = useState(localStorage.getItem('TheButtonColor')||'green')
  const [colorSaturation,setColorSaturation] = useState(JSON.parse(localStorage.getItem('ColorSaturation'))||500);

  //const URL = "http://localhost:10209" 
  const URL = "https://chat-server-backend-sockets.onrender.com"

  useEffect(()=>{
    axios.get(apiURl,{params:{'username':username}})
      .then((res)=>{
        changeStatus(true)
      })
      .catch((err)=>{
        console.log("Not online yet")
      })
  } ,[]);

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
            UpdateFinalNotifaction,
            ShowSettings,
            ToggleSettings,
            BgColor,
            setBgColor,
            TextColor,
            setTextColor,
            CurrentButtonColor,
            setCurrentButtonColor,
            colorSaturation,
            setColorSaturation
            }}>
            <RouterProvider router={router} />
              <Colours/>
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