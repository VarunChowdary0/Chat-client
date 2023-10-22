import React, { useContext, useEffect, useState } from 'react'
import { Globals } from '../globals/Globals';
import axios from 'axios';

const GetNotification = () => {
    const {URL} = useContext(Globals)
    const {AllRooms} = useContext(Globals) ; 
    const {username} = useContext(Globals)
    const [myRooms , setMyAllRooms] = useState([]);
    const {LocalDataOnNotifications} = useContext(Globals); // local.
    const [AllRoomLengths,updateLengths] = useState([]);
    const {FinalNotifications,UpdateFinalNotifaction} = useContext(Globals)
    const {NotificationArray , UpdateNotifaction} = useContext(Globals); // fetched.
    useEffect(()=>{
        const newNotifications = AllRooms.map(element => {
            return { 'room': element, 'length': 0 };
        });
        UpdateFinalNotifaction(newNotifications);
        Check();
    },[NotificationArray])
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
      setMyAllRooms(data)
    }
    useEffect(()=>{
        myRooms.forEach(element => {
            axios.get(URL + '/get_length_of_room',{params:{'room':element}})
                .then((res)=>{
                    AddToTheArray({ 
                        "room" : element,
                        "length" : res["data"]['length']});
                    console.log(`${element} => ${res["data"]['length']}`)
                })
                .catch((err)=>{
                    console.log('err:',err );
                })
        });
    },[myRooms])
    const AddToTheArray = (data) =>{
        updateLengths(AllRoomLengths => [...AllRoomLengths, data]);
    }
    useEffect(()=>{
        UpdateNotifaction([...new Set(AllRoomLengths)]);
       // console.log("jk",LocalDataOnNotifications)
        if(LocalDataOnNotifications.length === 0 ){
          //  console.log('New')
            localStorage.setItem('_Local_Notifications_',JSON.stringify(NotificationArray));
        }
    },[AllRoomLengths])
    const Check = () => {
        const uniqueOps = new Set();
        
        NotificationArray.forEach(fetched => {
            const hold = LocalDataOnNotifications.find(item => item.room === fetched.room);
            if (hold !== undefined) {
                    const MyOp = { 'room': hold.room, 'length': fetched.length  - hold.length };
                    uniqueOps.add(JSON.stringify(MyOp));
            }
        });
        // Convert the uniqueOps Set back to an array if needed
        const uniqueOpsArray = Array.from(uniqueOps).map(op => JSON.parse(op));
        // Assuming UpdateFinalNotifaction is a function to update the array
        UpdateFinalNotifaction(uniqueOpsArray);
    }
        
}

export default GetNotification