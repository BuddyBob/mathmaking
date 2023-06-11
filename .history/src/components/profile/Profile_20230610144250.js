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
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <div>
            <h3>Interests</h3>
            <input type="text" value={userData.interests} />
          </div>
          <div>
            <h3>Grade</h3>
            <input type="text" value={userData.grade} />
          </div>
          {/* Add more sections and inputs for each section */}
        </div>
      )}
    </div>
  );
};

export default Profile;
