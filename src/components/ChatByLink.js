import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Chat from './Chat';
import { Globals } from '../globals/Globals';


const ChatByLink = (props) => {
    const {id} = useParams();
    const {setRoomID} = useContext(Globals);
    useEffect(()=>{
        localStorage.setItem('roomID',id);
        setRoomID(id);
    })
  return (
    <Chat id={id}/>
  )
}

export default ChatByLink