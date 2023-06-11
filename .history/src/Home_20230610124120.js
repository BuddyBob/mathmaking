import './index.css'

import React, { createContext, useEffect, useState } from "react"

import { FaUserPlus } from 'react-icons/fa'
import { IoLogIn } from 'react-icons/io5'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { db } from './firebase'
import { useAuth } from './components/context/AuthContext'

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


const Home = () =>  {
    const { currentUser, logout } = useAuth()
    const [loggedIn,setLoggedIn] = useState(currentUser ? true : false)
    const [userId,setUserId] = useState(currentUser ? currentUser.uid : null)

    
    //User is logged in
    useEffect(() => {
        console.log(currentUser);
        if (loggedIn){
          returnUserData(userId).then(result => {

          })
        }
      }, [loggedIn])
    return (
        <div className="Home">
            <h1 className="title">Math Making</h1>
            <h3 className="subtitle">Personalize Your Study Group!</h3>
            <AppContext.Provider value={{loggedIn, userId}}>
                <div class="Authentication">
                    {
                        !loggedIn &&
                        <div>
                            <Link to='/signup'>
                            <input className="signup-frontpage" type="button" value="Sign Up" />
                            </Link>
                        </div>
                    }
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;