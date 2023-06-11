import React, { createContext, useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import NavBar from '../Nav/NavBar';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';

export const AppContext = createContext();

function returnUserData(userId) {
  let docRef = db.collection("users").doc(userId);
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

const Schedule = () => {
  const { currentUser, logout } = useAuth();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const userData = await returnUserData(currentUser.uid);
        if (userData && userData.schedule) {
          setSchedules(userData.schedule);
        }
      } catch (error) {
        console.log("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="title">Schedule</h1>
        {schedules.length > 0 ? (
            <div>
            {schedules.map((schedule, index) => (
                <div>
                    <strong>Name:</strong> {schedule.name}<br />
                    <strong>Zoom Link:</strong> {schedule.zoomLink}<br />
                    <strong>Time:</strong> {schedule.time}<br />
                </div>
            ))}
            </div>
        ) : (
          <h2 className="subtitle">404 <br/> No schedules found.</h2>
        )}
      </div>
    </div>
  );
};

export default Schedule;
