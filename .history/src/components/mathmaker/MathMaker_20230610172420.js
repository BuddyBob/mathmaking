import './Mathmaker.css'

import React, { createContext, useEffect, useState } from "react"

import NavBar from '../Nav/NavBar'
import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

const MathMaker = () =>  {
    return(
        <div className="container3">
            <NavBar />
            <div className="container">
                <h1 className="title">Math Maker</h1>
            </div>
            <input type="button" className="button" value="Start Math Making" placeholder="Start Match Making" />
        </div>

    )
}

export default MathMaker;