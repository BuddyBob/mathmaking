import './Profile.css';

import React, { useContext, useEffect, useState } from 'react';

import Tag from './Tag';
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
  const [selectedTags, setSelectedTags] = useState({ interests: [], grade: [] }); // Define selectedTags state

  useEffect(() => {
    returnUserData(currentUser.uid).then((result) => {
      setUserData(result);
    });
  }, [currentUser, setUserData]);

  const handleSubmit = () => {
    // Update user data and upload each section's input data as a list to Firestore
    const handleSubmit = () => {
        const interests = userData.interests || []; // Handle null value
        const grades = userData.grade || []; // Handle null value
      
        const updateData = {
          interests: interests.concat(selectedTags.interests), // Assuming selectedTags is an array of tags
          grade: grades.concat(selectedTags.interests), // Assuming selectedGrade is the selected grade value
        };
      
        db.collection('users')
          .doc(currentUser.uid) // Replace with the user's document ID
          .update(updateData)
          .then(() => {
            console.log('User data updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating user data:', error);
          });
      };
      
  };

  const interested = [
    'Sports',
    'Programming',
    'Engineering',
    'Cooking',
    'Photography',
    'Traveling',
    'Painting',
    'Reading',
    'Gardening',
    'Writing',
    'Music',
    'Hiking',
    'Yoga',
    'Fashion',
    'Gaming',
    'Dancing',
    'Coding',
    'Film and movies',
    'Fitness and exercise',
    'Meditation',
    'Food and dining',
    'DIY projects',
    'Volunteer work',
    'Collecting',
    'Outdoor activities',
    'Crafting',
    'Pets and animals',
    'History',
    'Science and technology',
    'Home decor',
    'Learning new languages',
    'Socializing and networking',
  ];

  const grades = ['6', '7', '8', '9', '10', '11', '12', '12+'];

  return (
    <div className="container2">
      {userData && (
        <div>
          <h1 className="title">Profile</h1>
          <div className="data">
            <br />
            <div className="interests">
              <h2 className="section">Interests</h2>
              <Tag
                already={userData.interests || []}
                tags_={interested}
                handleTags={(selectedTags) => setSelectedTags((prev) => ({ ...prev, interests: selectedTags }))}
              />
            </div>
            <br />
            <br />
            <div className="grade">
              <h2 className="section">Grade</h2>
              <Tag
                already={userData.grade || []}
                tags_={grades}
                handleTags={(selectedTags) => setSelectedTags((prev) => ({ ...prev, grade: selectedTags }))}
              />
            </div>
          </div>
          <input type="submit" className="button" value="Submit" onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default Profile;
