import React, { useContext, useEffect, useState } from 'react';
import { Globals } from '../globals/Globals';
import axios from 'axios';

const GetNotification = () => {
  const { URL, username, LocalDataOnNotifications, updateLocalnotifiation, FinalNotifications, UpdateFinalNotifaction } = useContext(Globals);

  const handleNotifications = (vb) => {
    // Check if the LocalDataOnNotifications is empty
    if (LocalDataOnNotifications.length === 0) {
      localStorage.setItem('_Local_Notifications_', JSON.stringify(vb));
      updateLocalnotifiation(vb);
    }

    Check(vb);
  }

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
    localStorage.setItem('_Local_Notifications_', JSON.stringify(LocalDataOnNotifications));
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
