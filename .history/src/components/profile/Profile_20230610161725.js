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

  handleSubmit(() => {
    // Update user data
    
  }

  const interested = ['Sports', 'Programming', 'Engineering', "Cooking","Photography","Traveling","Painting","Reading","Gardening","Writing","Music","Hiking","Yoga","Fashion","Gaming","Dancing","Coding","Film and movies","Fitness and exercise","Meditation","Food and dining","DIY projects","Volunteer work","Collecting","Outdoor activities","Crafting","Pets and animals","History","Science and technology","Home decor","Learning new languages","Socializing and networking"]
  const grades = ['6','7','8','9','10','11','12','12+']
  return (
    <div className="container2">
      {userData && (
        <div>
            {console.log(userData.username)}
            <h1 className="title">Profile</h1>
            <div className="data">
                <br />
                <div className="interests">
                    <h2 className="section">Interests</h2>
                    {
                    userData.interests ? (
                        userData.interests.map((i) => {
                            return <Tag already={[i]} tags_={interested}/>
                        })
                        ):
                        (<Tag already={[]} tags_={interested}/>)
                    }
                </div>
                <br/>
                <br/>
                <div className="grade">
                    <h2 className="section" >Grade</h2>
                    {
                    userData.grade ? (
                        userData.grade.map((i) => {
                            return <Tag already={[i]} tags_={grades}/>
                        })
                        ):
                        (<Tag already={[]} tags_={grades}/>)
                    }
                </div>
            </div>
        
          {/* Add more sections and inputs for each section */}
          <input type="submit" className="button" value="Submit" onClick={() => handleSubmit()}/>
        </div>
    
      )}
    </div>
  );
};

export default Profile;
