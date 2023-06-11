import React, { createContext, useEffect, useState } from "react"

import { Link } from 'react-router-dom';
import NavBar from '../Nav/NavBar'
import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

export const AppContext = createContext()

function returnUserData(userId){
    let docRef = db.collection("users").doc(userId)
    return docRef.get().then((doc) => {
      if (doc.exists) {
          return doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }


const Schdule = () =>  {
    const { currentUser, logout } = useAuth()
    return(
        <div>
            <NavBar/>
        <div className="container">
            
        </div>

        </div>
    )
}
export default Schedule