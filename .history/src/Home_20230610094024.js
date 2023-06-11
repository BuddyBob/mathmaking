import './index.css'

import React, { createContext, useEffect, useState } from "react"

export const AppContext = createContext()
const Home = () =>  {
    return (
        <div className="Home">
            <h1 className="title">Math Making</h1>
            <h3 className="subtitle">Personalize Your Study Group!</h3>
            <AppContext.Provider value={{}}>
                <div>
                <button class="login-button">Login</button>
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;