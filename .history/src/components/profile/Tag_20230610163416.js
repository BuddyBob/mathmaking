import './Tag.css'

import React, { useState } from 'react';

import { db } from '../../firebase';

const Tag = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [matchingTags, setMatchingTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchValue(value);

    // Perform the tag search logic here
    const matchedTags = searchTags(value);
    setMatchingTags(matchedTags);
  };

  const searchTags = (searchQuery) => {
    // Mock data: Replace this with your own logic to fetch matching tags from an API or database
    const tags = props.tags_;

    // Filter the tags based on the search query and limit the results to maximum 5 tags
    const matchedTags = tags
      .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);

    return matchedTags;
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => [...prevTags, tag]); // Add the selected tag to the state
    setSearchValue('');
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(updatedTags); // Update the selected tags state by removing the tag
  };

  const handleSubmit = () => {
    // Add logic to handle tag submission to Firebase
    const { section } = props;

    // Update the user's section in Firebase with the selected tags
    const userRef = db.collection('users').doc('user-id'); // Replace 'user-id' with the actual user ID
    userRef.update({
      [section]: selectedTags,
    })
    .then(() => {
      console.log('Tags submitted successfully!');
    })
    .catch((error) => {
      console.error('Error submitting tags:', error);
    });
  };

  return (
    <div className="tag-container">
      <div className="selected-tags">
        {[...selectedTags, ...props.already].map((tag, index) => (
          <button
            key={index}
            onClick={() => handleRemoveTag(tag)}
            className={selectedTags.includes(tag) ? 'selected' : ''}
          >
            {tag}
          </button>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search tags"
          className="tag-input"
        />
      </div>
      <ul className="matching-tags">
        {matchingTags.map((tag, index) => (
          <li key={index}>
            <button onClick={() => handleTagClick(tag)}>{tag}</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Tag;
