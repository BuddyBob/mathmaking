import { Link, useHistory } from 'react-router-dom'
import React, { useRef, useState } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

async function returnedUsernames(){
    const snapshot = await db.collection('users').get()
    const snappy = await snapshot.docs.map(doc => doc.data())
    let usernames = []
    for (var x of snappy){
        usernames.push(x.username)
    }
    return usernames
}
function encryptPwd(pwd){
    const CryptoJS = require("crypto-js");
    const passphrase = "sank bridged imitation dose";
    return CryptoJS.AES.encrypt(pwd,passphrase).toString();
};

const Signup = () => {
    const { signup } = useAuth()
    return(
        <div>
            Sign up
        </div>
    )
}
export default Signup;