import './index.css'

import React, { createContext, useEffect, useState } from "react"

import { db } from './firebase'
import { useAuth } from './components/context/AuthContext'

export const AppContext = createContext()
const Home = () =>  {
    return (
        <div className="Home">
            <h1 className="title">Math Making</h1>
            <h3 className="subtitle">Personalize Your Study Group!</h3>
            <AppContext.Provider value={{}}>``
            <div class="Authentication">
                 <button class="login-button">Login</button>
                 <button class="register-button">Register</button>

            </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;