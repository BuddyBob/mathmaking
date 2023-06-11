import React, { createContext, useEffect, useState } from "react"
export const AppContext = createContext()
const Home = () =>  {
    return (
        <div>
            <h1>Match Making</h1>
            <AppContext.Provider value={{}}>
                <div>

                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;