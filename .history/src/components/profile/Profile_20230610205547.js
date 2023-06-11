import './Profile.css';

import React, { useContext, useEffect, useState } from 'react';

import NavBar from '../Nav/NavBar';
import Tag from './Tag';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app'; // Import the firebase object
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

  const handleSubmit = (section, tags) => {
    // Save the selected tags to Firebase
    const userId = currentUser.uid;

    db.collection('users')
      .doc(userId)
      .update({
        [section]: firebase.firestore.FieldValue.arrayUnion(...tags),
      })
      .then(() => {
        console.log('Tags submitted successfully!');
        alert('Tags submitted successfully!')
      })
      .catch((error) => {
        console.log('Error submitting tags:', error);
      });
  };

  const interested = ['Sports', 'Programming', 'Engineering', 'Cooking', 'Photography', 'Traveling', 'Painting', 'Reading', 'Gardening', 'Writing', 'Yoga', 'Hiking', 'Yoga', 'Fashion', 'Gaming', 'Dancing', 'Coding', 'Film and movies', 'Fitness and exercise', 'Meditation', 'Food and dining', 'DIY projects', 'Volunteer work', 'Collecting', 'Outdoor activities', 'Crafting', 'Pets and animals', 'History', 'Science and technology', 'Home decor', 'Learning new languages', 'Socializing and networking'];
  const interested_already = []
  const grades = ['6', '7', '8', '9', '10', '11', '12', '12+'];
    const grades_already = []
  
  const learning = ['Math','Science','English','History','Art','Music','Computer Science','Foreign Language','Geometry','Physics','Biology','Chemistry','Literature','Geography','Physical Education','Economics','Psychology','Sociology','Political Science',]
  
  const learning_already = []

  return (
    <div>
      <NavBar />
    <div className="pcontainer">
      {userData && (
        <div>
          {console.log(userData.username)}
          <h1 className="title">Profile</h1>
          <div className="data">
            <div className="interests">
              <h2 className="section">Interests</h2>
              {userData.interests ? (
                userData.interests.map((i) => {
                  interested_already.push(i);
                  return null; // Return null in map function to avoid rendering issues
                })
              ) : null}
              <Tag
                already={interested_already}
                tags_={interested}
                onSubmit={(tags) => handleSubmit('interests', tags)}
              />
            </div>

            <div className="grade">
              <h2 className="section">Grade</h2>
              {userData.grade ? (
                userData.grade.map((i) => {
                  grades_already.push(i);
                  return null; // Return null in map function to avoid rendering issues
                })
              ) : null}
              <Tag
                already={grades_already}
                tags_={grades}
                onSubmit={(tags) => handleSubmit('grade', tags)}
              />
            </div>
            <div className="learning">
              <h2 className="section">Learning</h2>
              {userData.learning ? (
                userData.learning.map((i) => {
                  learning_already.push(i);
                  return null; // Return null in map function to avoid rendering issues
                })
              ) : null}
              <Tag
                already={learning_already}
                tags_={learning}
                onSubmit={(tags) => handleSubmit('learning', tags)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
