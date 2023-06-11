import React, { createContext, useEffect, useState } from "react"

const Home = () =>  {
    return (
        <div>
            <AppContext.Provider value={{}}>
                <div>
                    <h1>Home</h1>
                </div>
            </AppContext.Provider>
        </div>
    )
}
export default Home;