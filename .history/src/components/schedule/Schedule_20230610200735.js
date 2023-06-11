import './Schedule.css';

import React, { createContext, useEffect, useState } from "react";

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
            <div className="sched-container">
            {schedules.map((schedule, index) => (
                <div className="sched-data">
                    <h3 className="s-name">{schedule.with}</h3>
                    <div className="sched-text">Zoom Link</div>
                        <div className="sched-a">
                            <a className="zoom-link" href={schedule.zoomLink}>{schedule.zoomLink}</a>
                        </div>
                    <div className="sched-text">Time</div><div className="sched-a">{schedule.time}</div>
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
