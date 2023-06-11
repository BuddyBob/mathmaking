import './index.css'

import React, { createContext, useEffect, useState } from "react"

import { Link } from 'react-router-dom';
import NavBar from './components/Nav/NavBar'
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
    const [expanded, setExpanded] = useState(false);

    const toggleContent = () => {
      setExpanded(!expanded);
    };
    
    //User is logged in
    useEffect(() => {
        console.log(currentUser);
        if (loggedIn){
          returnUserData(currentUser.uid).then(result => {

          })
        }
      }, [loggedIn])
    return (
        <div className="Home">
            <AppContext.Provider value={{loggedIn}}>
                <NavBar/>
                <div className="container">
                    <h1 className="title">Math Making</h1>
                    <h3 className="subtitle">Personalize Your Study Group!</h3>
                    <div class="Authentication">
                        {
                            !currentUser &&
                            <div>
                                <Link to='/signup'>
                                    <input className="button" type="button" value="Sign Up" />
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="content">
                        <div className="explanation">
                            <button className="button" onClick={() => toggleContent()}>
                                How does this work?
                            </button>
                            {expanded && (
                                <div className="expanded-content">
                                <p>
                                    The name math making is a play on the word matchmaking. Here at math making we want to help you find the perfect study group for you.
                                    We use a complex algorithm to match you with other students based on your interests, personality, age, region and more! 
                                    After you sign up and fill out your profile we will attempt to match you with other students with similar interests and personalities.
                                    We will provide you with a time and zoom link to start studying together. Through this process we hope to help you find the perfect study group for you
                                    and hopefully meet new people!
                                </p>
                                </div>
                            )}
                        </div>
                        <div className="button-container">
                            <input className="button" type="button" value="Profile" />
                            <input className="button" type="button" value="Mathmake!" />
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;