import React, { useContext, useEffect, useState } from 'react'
import { Globals } from '../globals/Globals';
import axios from 'axios';

const GetNotification = () => {
    const {URL} = useContext(Globals)
    const {username} = useContext(Globals)
    const {LocalDataOnNotifications} = useContext(Globals); // local.
    const {FinalNotifications,UpdateFinalNotifaction} = useContext(Globals)
//const {NotificationArray , UpdateNotifaction} = useContext(Globals); // fetched.

    
    useEffect(()=>{
        axios.get(URL+'/get_length_of_rooms',{params:{'username':username}})
            .then((res)=>{
                console.log(res['data']);
                Loogio(res['data'])
            })
            .catch((err)=>{
                console.log("erroe: ",err);
            })
    },[LocalDataOnNotifications])
    const Loogio =(vb)=>{
       //UpdateNotifaction([...new Set(AllRoomLengths)]);
        if(LocalDataOnNotifications.length === 0 ){
            console.log('New')
            localStorage.setItem('_Local_Notifications_',JSON.stringify(vb));
        }
        Check(vb);
    }
    const Check = (vb) => {
        LocalDataOnNotifications.forEach(fetched => {
            console.log('o')
            const hold = vb.find(item => item.room === fetched.room);
                const MyOp = { 'room': hold.room, 'length': hold.length  - fetched.length };
              //  console.log(`{'room': ${hold.room}, 'length': ${fetched.length  - hold.length}`)
                UpdateFinalNotifaction((list)=>[...list,MyOp])
        });       
    }
        
    useEffect(()=>{
        console.log(FinalNotifications)
    },[])
}

export default GetNotification