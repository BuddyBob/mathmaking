import './Mathmaker.css'

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
  
    // Calculate matching score based on grade
    if (grade && userGrade) {
      // Calculate the difference between the two grades
      const gradeDifference = Math.abs(parseInt(grade) - parseInt(userGrade));
  
      // Increase matching score based on the grade difference
      matchingScore += 10 - gradeDifference;
    }
  
    // Calculate matching score based on interests
    if (interests && userInterests) {
      // Count the number of matching interests
      const commonInterests = interests.filter((interest) => userInterests.includes(interest));
      const numCommonInterests = commonInterests.length;
  
      // Increase matching score based on the number of common interests
      matchingScore += numCommonInterests;
    }
  
    return matchingScore;
  };
  
  
  const MathMaker = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [matchedUsers, setMatchedUsers] = useState([]);
  
    useEffect(() => {
      returnUserData(currentUser.uid).then((result) => {
        setUserData(result);
      });
    }, [currentUser, setUserData]);
  
    const handleSubmit = () => {
      if (!userData) return;
  
      const { grade, interests } = userData;
  
      // Query the database to fetch other user profiles
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          const matchedUsers = [];
  
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            const { grade: userGrade, interests: userInterests } = user;
  
            // Compare the user's sections with the userData sections
            // You can implement your own logic to calculate a matching score or criteria
            const matchingScore = calculateMatchingScore(grade, interests, userGrade, userInterests);
  
            // Add the user to the matchedUsers array with the matching score
            matchedUsers.push({ user, matchingScore });
          });
  
          // Sort the matchedUsers based on the matching score
          matchedUsers.sort((a, b) => b.matchingScore - a.matchingScore);
  
          // Update the state with the matchedUsers
          setMatchedUsers(matchedUsers);
        })
        .catch((error) => {
          console.log('Error getting users:', error);
        });
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
        </div>
      </div>
    );
  };
export default MathMaker  