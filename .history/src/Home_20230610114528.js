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


    return (
        <div className="Home">
            <h1 className="title">Math Making</h1>
            <h3 className="subtitle">Personalize Your Study Group!</h3>
            <AppContext.Provider value={{}}>
                <div class="Authentication">
                    <Link to='/signup'>
                        <FaUserPlus style={{position:"relative",left:"3px"}} size={44} className="addUser-icon"/>
                    </Link>
                    <br/>
                    <Link to='/login'>
                        <IoLogIn size={44} className="login-icon"/>
                    </Link>
                    <br/>
                    <div>
                        {/* <IoLogOut size={22} onClick={handleLogout} className="logout-icon"/> */}
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;