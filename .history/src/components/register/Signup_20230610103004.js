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
    const usernameRef = useRef();
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState("false")
    const history = useHistory()
    const { currentUser } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        let users = await returnedUsernames()
        if (users.includes(usernameRef.current.value)){
            console.log("Username already exists")
            return setError("This username is taken")
        }
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        if (passwordRef.current.value === passwordConfirmRef.current.value){
            try {
                setError("")
                setLoading("true")
                console.log(currentUser)
                const x = await signup(emailRef.current.value, passwordRef.current.value)
                //add new data to user
                let encryptedPwd = encryptPwd(passwordRef.current.value)
                db.collection("users").doc(x.user.uid).set({
                    email: emailRef.current.value,
                    password: encryptedPwd,
                    username: usernameRef.current.value,
                    wordCount:"10",
                    englishType:"english1k",
                    audio:false,
                    logs:{
                        errorHistory:[],
                        wpmHistory:[],
                        rawWpmHistory:[],
                        accuracyHistory:[],
                        realAccuracyHistory:[]}
                })
                .then(() => {
                    localStorage.setItem("currentUserId",x.user.uid)
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });        
                console.log("ADDED USER",x.user.uid)       
                history.push('/')
            } catch(err) {
                console.log("ERROR",err)
                setError(err.message)
            }
            setLoading("false")
        }
    }
    return(
        <div>
            Sign up
        </div>
    )
}
export default Signup;