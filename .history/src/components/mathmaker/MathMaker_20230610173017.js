import './Mathmaker.css'

import React, { createContext, useEffect, useState } from "react"

import NavBar from '../Nav/NavBar'
import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

function returnUserData(userId) {
    let docRef = db.collection('users').doc(userId);
  
    return docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }
  
const MathMaker = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      returnUserData(currentUser.uid).then((result) => {
        setUserData(result);
      });
    }, [currentUser, setUserData]);
  
    function handleSubmit(user) {
    }
    return(
        <div className="container3">
            <NavBar />
            <div className="container2">
                <h1 className="title">Math Maker</h1>
                <input onClick={() => handleSubmit()}type="button" className="button-mm" value="Start Math Making" placeholder="Start Match Making" />
            </div>
            
        </div>

    )
}

export default MathMaker;