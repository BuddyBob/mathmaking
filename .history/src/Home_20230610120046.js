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

    async function handleLogout(){
        await logout()
        setLoggedIn(false)
        setUserId(null)
    }
    
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
            <AppContext.Provider value={{}}>
                <div class="Authentication">
                    {
                        loggedIn &&
                        <div>
                            <IoLogOut size={22} onClick={handleLogout} className="logout-icon"/>
                        </div>
                        
                    }
                    {
                        !loggedIn &&
                        <div>

                            <Link to='/signup'>
                            <FaUserPlus style={{position:"relative",left:"3px"}} size={44} className="addUser-icon"/>
                            </Link>
                            <Link to='/login'>
                                <IoLogIn size={44} className="login-icon" />
                            </Link>

                        </div>
                    }
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;