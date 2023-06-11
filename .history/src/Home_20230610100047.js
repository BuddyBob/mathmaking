import './index.css'

import React, { createContext, useEffect, useState } from "react"

import { db } from './firebase'
import { useAuth } from './components/context/AuthContext'

export const AppContext = createContext()
const Home = () =>  {
    const { currentUser, logout } = useAuth()
    return (
        <div className="Home">
            <h1 className="title">Math Making</h1>
            <h3 className="subtitle">Personalize Your Study Group!</h3>
            <AppContext.Provider value={{}}>``
            <div class="Authentication">
                <Link to='/signup'>
                    <FaUserPlus style={{position:"relative",left:"3px"}} size={20} className="addUser-icon"/>
                  </Link>
                <Link to='/login'>
                    <IoLogIn size={22} className="login-icon"/>
                </Link>
            </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;