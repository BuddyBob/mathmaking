import "./Mathmaker.css";

import React, { useEffect, useState } from "react";

import NavBar from '../Nav/NavBar';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';

const MathMaker = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [userTexts, setUserTexts] = useState({});

  useEffect(() => {
    returnUserData(currentUser.uid).then((result) => {
      setUserData(result);
    });
  }, [currentUser, setUserData]);

  const returnUserData = (userId) => {
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
  };

  const calculateMatchingScore = (grade, interests, userGrade, userInterests) => {
    let matchingScore = 0;
    let maxScore = interests.length + 10;

    // Calculate matching score based on grade
    if (grade && userGrade) {
      if (grade === '12+') grade = '12';
      const gradeDifference = Math.abs(parseInt(grade) - parseInt(userGrade));

      matchingScore += 10 - gradeDifference;
    }

    // Calculate matching score based on interests
    if (interests && userInterests) {
      const commonInterests = interests.filter((interest) => userInterests.includes(interest));
      const numCommonInterests = commonInterests.length;

      matchingScore += numCommonInterests;
    }

    const accuracyPercentage = (matchingScore / maxScore) * 100;
    return accuracyPercentage.toFixed(2);
  };

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

  const handleCardClick = (userId) => {
    if (flippedCards.includes(userId)) {
      setFlippedCards(flippedCards.filter((id) => id !== userId));
    } else {
      setFlippedCards([...flippedCards, userId]);
    }
  };

  const handleUserTextChange = (userId, text) => {
    setUserTexts({ ...userTexts, [userId]: text });
  };

  const getUserText = (userId) => {
    return userTexts[userId] || "";
  };

  return (
    <div className="container3">
      <NavBar />
      <div className="container2">
        <h1 className="title">Math Maker</h1>
        {userData && (
          <input
            onClick={handleSubmit}
            type="button"
            className="button-mm"
            value="Start Math Making"
            placeholder="Start Match Making"
          />
        )}
        {matchedUsers && (
          <div className="matched-users">
            {matchedUsers.map(({ user, matchingScore }) => (
              <div
                className={`matched-user ${flippedCards.includes(user.id) ? "flipped" : ""}`}
                key={user.id}
                onClick={() => handleCardClick(user.id)}
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
                        <div className="interest" key={interest}>{interest},</div>
                      ))
                    )}
                  </div>
                  <div className="matched-user-section">
                    <strong className="mm-section">Grades</strong>
                    <br />
                    {user.grade && (
                      user.grade.map((grades) => (
                        <div className="grade" key={grades}>{grades},</div>
                      ))
                    )}
                  </div>
                </div>
                <div className="matched-user-content">
                  <textarea
                    className="user-textarea"
                    value={getUserText(user.id)}
                    onChange={(e) => handleUserTextChange(user.id, e.target.value)}
                    placeholder="Enter text here"
                  ></textarea>
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
