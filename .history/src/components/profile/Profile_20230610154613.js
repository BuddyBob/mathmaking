import './Profile.css'

import React, { useContext, useEffect, useState } from 'react';

import Tag from './Tag'
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
    <div className="container2">
      {userData && (
        <div>
            {console.log(userData.username)}
            <h1 className="title">Profile</h1>
            <div className="data">
                <h2 className="sections"><strong>Name:</strong> {userData.username}</h2>
                <br />
                <div className="interests">
                    <h2 className="section">Interests</h2>
                    <Tag tags_={['Sports', 'Programming', 'Engineering', "Cooking","Photography","Traveling","Painting","Reading","Sports","Gardening","Writing","Music","Hiking","Yoga","Fashion","Gaming","Dancing","Coding","Film and movies","Fitness and exercise","Meditation","Food and dining","DIY projects","Volunteer work","Collecting","Outdoor activities","Crafting","Pets and animals","History","Science and technology","Home decor","Learning new languages","Socializing and networking"]} />
                </div>
                <div className="grade">
                    <h2 className="section" >Grade</h2>
                    <Tag tags_={['6','7','8','9','10','11','12','12+']} />
                </div>
            </div>
        
          {/* Add more sections and inputs for each section */}
        </div>
      )}
    </div>
  );
};

export default Profile;
