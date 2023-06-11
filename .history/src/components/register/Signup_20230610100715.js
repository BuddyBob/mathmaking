import { Link, useHistory } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const { signup } = useAuth()
    return(
        <div>
            Sign up
        </div>
    )
}