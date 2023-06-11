import './Mathmaker.css';

import React, { createContext, useEffect, useState } from "react"

import NavBar from '../Nav/NavBar'
import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

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

const calculateMatchingScore = (grade, interests, userGrade, userInterests) => {
  let matchingScore = 0;
  let maxScore = interests.length + 10;

  if (grade && userGrade) {
    if (grade === '12+') grade = '12';
    const gradeDifference = Math.abs(parseInt(grade) - parseInt(userGrade));
    matchingScore += 10 - gradeDifference;
  }

  if (interests && userInterests) {
    const commonInterests = interests.filter((interest) => userInterests.includes(interest));
    const numCommonInterests = commonInterests.length;
    matchingScore += numCommonInterests;
  }

  const accuracyPercentage = (matchingScore / maxScore) * 100;
  return accuracyPercentage.toFixed(2);
};

const MathMaker = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    returnUserData(currentUser.uid).then((result) => {
      setUserData(result);
    });
  }, [currentUser, setUserData]);

  const handleSubmit = () => {
    if (!userData) return;

    const { grade, interests } = userData;

    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const matchedUsers = [];

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const { grade: userGrade, interests: userInterests } = user;
          const matchingScore = calculateMatchingScore(grade, interests, userGrade, userInterests);
          matchedUsers.push({ user, matchingScore });
        });

        matchedUsers.sort((a, b) => b.matchingScore - a.matchingScore);

        setMatchedUsers(matchedUsers);
      })
      .catch((error) => {
        console.log('Error getting users:', error);
      });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="mm-container1">
      <NavBar />
      <h1 className="title">Math Maker</h1>
      <div className="mm-container2">
        {userData && !selectedUser && ( 
          <input
            onClick={handleSubmit}
            type="button"
            className="button-mm"
            value="Start Math Making"
            placeholder="Start Match Making"
          />
        )}
        {selectedUser && (
          <div className="selected-user">
              <div className="matched-user-actions">
                <a className="zoom-link" href="https://zoom.us/j/1234567890">Create Zoom Link</a>
                <button className="schedule-button">Schedule Meeting</button>
                <div className="time">Time: {selectedUser.user.time}</div>
                <button className="back-button" onClick={handleBackClick}>Back</button>
              </div>
          </div>
        )}
        {!selectedUser && matchedUsers && (
          <div className="matched-users">
            {matchedUsers.map(({ user, matchingScore }) => (
              <div
                key={user.username}
                className="matched-user"
                onClick={() => handleUserClick({ user, matchingScore })}
              >
                <div className="matched-user-info">
                  <div className="matched-user-name">{user.username}</div>
                  <div className="matched-user-matching-score">Score: {matchingScore}%</div>
                  <br />
                  <div className="matched-user-section">
                    <strong className="mm-section">Interests</strong>
                    <br />
                    {user.interests && (
                      user.interests.map((interest) => (
                        <div key={interest} className="mm-text">{interest}</div>
                      ))
                    )}
                  </div>
                  <div className="matched-user-section">
                    <strong className="mm-section">Grades</strong>
                    <br />
                    {user.grade && (
                      user.grade.map((grade) => (
                        <div key={grade} className="mm-text">{grade}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MathMaker;
