import React, { createContext, useEffect, useState } from "react"

import NavBar from '../Nav/NavBar'
import { db } from './firebase'
import { useAuth } from './components/context/AuthContext'

const MathMaker = () =>  {
    return(
        <NavBar />
    )
}

export default MathMaker;