import React, { createContext, useEffect, useState } from "react"

import NavBar from './components/Nav/NavBar'
import { db } from './firebase'
import { useAuth } from './components/context/AuthContext'
const Home = () =>  {
    return(
        <NavBar />
    )
}