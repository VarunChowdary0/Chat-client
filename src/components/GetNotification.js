import React, { useContext, useEffect, useState } from 'react';
import { Globals } from '../globals/Globals';
import axios from 'axios';
import { json } from 'react-router-dom';

const GetNotification = () => {
  const { URL, username, LocalDataOnNotifications, updateLocalnotifiation, FinalNotifications, UpdateFinalNotifaction } = useContext(Globals);
  const [ml,sml] = useState(0);
  const handleNotifications = (vb) => {
    // Check if the LocalDataOnNotifications is empty
    if (LocalDataOnNotifications.length === 0) {
      localStorage.setItem('_Local_Notifications_', JSON.stringify(vb));
      console.log(localStorage.getItem("_Local_Notifications_"))
      updateLocalnotifiation(vb);
    }
    sml(vb.length);
    Check(vb);
  }
  useEffect(()=>{
    if(localStorage.getItem('username')==undefined){
      localStorage.clear();
      window.location.href = '/'
    }
  })

  useEffect(()=>{
    console.log(ml);
  },[ml])
  const Check = (vb) => {
    const latestNotification = vb[vb.length - 1];
    const existingNotification = LocalDataOnNotifications.find((x) => x.room === latestNotification.room);

    if (!existingNotification && LocalDataOnNotifications.length !== 0) {
      const newNotification = { room: latestNotification.room, length: latestNotification.length };
      UpdateFinalNotifaction((list) => [...list, newNotification]);
      updateLocalnotifiation((x) => [...x, newNotification]);
    }

    vb.forEach((fetched) => {
      const hold = LocalDataOnNotifications.find((item) => item.room === fetched.room);
      if (hold) {
        const diffLength = fetched.length - hold.length;
        const notificationUpdate = { room: fetched.room, length: diffLength };
        UpdateFinalNotifaction((list) => [...list, notificationUpdate]);
      }
    });

    // Update local storage only once at the end
    const MyTemp =[] 
        LocalDataOnNotifications.forEach(element => {
            const myO = MyTemp.find(item => item.room === element.room);
            if (myO === undefined) {
              MyTemp.push(element);
            }
          });
    console.log(MyTemp)
    localStorage.setItem('_Local_Notifications_',null);
    localStorage.setItem('_Local_Notifications_', JSON.stringify(MyTemp));
    console.log(JSON.parse(localStorage.getItem("_Local_Notifications_")).length)
  };

  useEffect(() => {
    axios
      .get(URL + '/get_length_of_rooms', { params: { username } })
      .then((res) => {
        handleNotifications(res.data); // Update to use handleNotifications
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, [LocalDataOnNotifications]);

  useEffect(() => {
    console.log(FinalNotifications);
  }, []);

  return null; // You need to return something in a React component.
};

export default GetNotification;
