import './Profile.css'

import React, { useContext, useEffect, useState } from 'react';

import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';

function returnUserData(userId) {
  let docRef = db.collection('users').doc(userId);

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
}

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    returnUserData(currentUser.uid).then((result) => {
      setUserData(result);
    });
  }, [currentUser, setUserData]);

  return (
    <div>
      {userData && (
        <div>
          <h1>User Profile</h1>
            <h2><strong>Name:</strong> {userData.name}</h2>
          <div>
            <h2>Interests</h2>
            <input type="text" value={userData.interests} />
          </div>
          <div>
            <h2>Grade</h2>
            <input type="text" value={userData.grade} />
          </div>
          {/* Add more sections and inputs for each section */}
        </div>
      )}
    </div>
  );
};

export default Profile;
