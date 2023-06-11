import React, { createContext, useEffect, useState } from "react"

import NavBar from '../Nav/NavBar'
import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

const MathMaker = () =>  {
    return(
        <div className="container">
            <NavBar />
        </div>

    )
}

export default MathMaker;