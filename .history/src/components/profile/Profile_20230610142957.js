import React, { useContext, useEffect, useState } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

function returnUserData(userId){
    let docRef = db.collection("users").doc(userId)


    return docRef.get().then((doc) => {
      if (doc.exists) {
          return doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

const Profile = () =>  {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null)

    useEffect(() => {
          returnUserData(currentUser.uid).then(result => {
            setUserData(result)
          })
      }, [currentUser, setUserData])

  return (
    <div>Profile</div>
  )
}

export default Profile
