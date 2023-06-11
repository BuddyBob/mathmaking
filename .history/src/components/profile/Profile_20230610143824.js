import React, { useContext, useEffect, useState } from 'react'

import { db } from '../../firebase'
import { useAuth } from '../context/AuthContext'

function returnUserData(userId){
    let docRef = db.collection("users").doc(userId)


    return docRef.get().then((doc) => {
      if (doc.exists) {
          return doc.data();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

const Profile = () =>  {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null)

    useEffect(() => {
          returnUserData(currentUser.uid).then(result => {
            setUserData(result)
          })
      }, [currentUser, setUserData])

  return (
    <div>
        {userData && 
        <form>
        <section>
        <h2>Interests</h2>
        <div class="tag-container">
            <label for="interests-sports"><input type="checkbox" id="interests-sports" name="interests[]" value="sports">Sports</label>
            <label for="interests-coding"><input type="checkbox" id="interests-coding" name="interests[]" value="coding">Coding</label>
        </div>
        </section>
        
        <section>
        <div class="tag-container">
            <label for="subjects-math"><input type="checkbox" id="subjects-math" name="subjects[]" value="math">Mathematics</label>
            <label for="subjects-english"><input type="checkbox" id="subjects-english" name="subjects[]" value="english">English</label>
        </div>
        </section>
        
        <section>
        <h2>Grades</h2>
        <div class="tag-container">
            <label for="grades-6"><input type="checkbox" id="grades-6" name="grades[]" value="6">Grade 6</label>
            <label for="grades-7"><input type="checkbox" id="grades-7" name="grades[]" value="7">Grade 7</label>
        </div>
        </section>
        
        
        
        <button type="submit">Submit</button>
    </form>
    }
    </div>

  )
}

export default Profile
