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
                                    <input className="signup-frontpage" type="button" value="Sign Up" />
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="explanation">
                        <button className="expand-button" onClick={toggleContent}>
                            Learn More
                        </button>
                        {expanded && (
                            <div className="expanded-content">
                                {console.log(expanded)}
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget lacus ullamcorper,
                                vestibulum justo sed, posuere lectus. Nullam convallis, dolor vel molestie rutrum,
                                enim risus posuere lorem, ut hendrerit elit massa vel nisi.
                            </p>
                            </div>
                        )}
                    </div>
                    <div className="button-container">
                        <span className="text">Customize Your Profile</span>
                        <br/>
                        <input className="buttons" type="button" value="Profile" />
                    </div>
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;