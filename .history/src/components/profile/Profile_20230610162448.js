import React, { useEffect, useState } from 'react';

import Tag from './Tag';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    returnUserData(currentUser.uid).then((result) => {
      setUserData(result);
    });
  }, [currentUser, setUserData]);

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

  const handleSubmit = (selectedTags, section) => {
    // Update user data in Firestore
    const updateData = {
      [section]: selectedTags,
    };

    db.collection('users')
      .doc(currentUser.uid)
      .update(updateData)
      .then(() => {
        console.log('User data updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
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
              {userData.interests ? (
                userData.interests.map((i) => {
                  return (
                    <Tag
                      section="interests"
                      already={[i]}
                      tags_={interested}
                      handleSubmit={handleSubmit}
                    />
                  );
                })
              ) : (
                <Tag section="interests" already={[]} tags_={interested} handleSubmit={handleSubmit} />
              )}
            </div>
            <br />
            <br />
            <div className="grade">
              <h2 className="section">Grade</h2>
              {userData.grade ? (
                userData.grade.map((i) => {
                  return (
                    <Tag
                      section="grade"
                      already={[i]}
                      tags_={grades}
                      handleSubmit={handleSubmit}
                    />
                  );
                })
              ) : (
                <Tag section="grade" already={[]} tags_={grades} handleSubmit={handleSubmit} />
              )}
            </div>
          </div>

          {/* Add more sections and inputs for each section */}
        </div>
      )}
    </div>
  );
};

export default Profile;
