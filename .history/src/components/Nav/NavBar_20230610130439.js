import './NavBar.css'

import React, { useContext, useState } from 'react'

import { AiOutlineMenu } from 'react-icons/ai'
import { AppContext } from '../../Home'
import { FaUserPlus } from 'react-icons/fa'
import { IoLogIn } from 'react-icons/io5'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar() {
    const { currentUser, logout } = useAuth();
    const { loggedIn: contextLoggedIn, userId: contextUserId } = useContext(AppContext); // Access the context values
    const [loggedIn, setLoggedIn] = useState(contextLoggedIn); // Define the loggedIn state with initial value from context
    const [userId, setUserId] = useState(contextUserId);

    async function handleLogout(){
        await logout()
        setLoggedIn(false)
        setUserId(null)
    }
    return (
        <div id="navbar">
            {loggedIn &&
            <div id="logged-in">
                <nav className="navbar">
                    <Link to="/" style={{textDecoration: 'none' }}>
                        <span className="logo">Quick Type</span>
                    </Link>
                    <div className="navbar-links">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about-us">About Us</Link>
                            </li>
                            <li>
                                <Link to='/profile'>Profile</Link>
                            </li>
                            <li>
                                <IoLogOut size={44} onClick={handleLogout} className="logout-icon"/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            }
            {!loggedIn &&
            <div id="logged-out">
                <nav className="navbar">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="logo">Math Making</span>
                    </Link>
                    <div className="navbar-links">
                        <ul>
                            <li>
                                <Link to="/">
                                    <span className="icon">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us">
                                    <span className="icon">About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/signup'>
                                    <FaUserPlus size={44} className="signIn-icon" />
                                </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    <IoLogIn size={44} className="login-icon" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            }
        </div>
    )
}

export default NavBar
