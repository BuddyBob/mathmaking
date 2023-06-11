import './Tag.css';

import React, { useState } from 'react';

const Tag = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [matchingTags, setMatchingTags] = useState([]);

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

    // Filter the tags based on the search query and limit the results to a maximum of 5 tags
    const matchedTags = tags
      .filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);

    return matchedTags;
  };

  const handleTagClick = (tag) => {
    props.handleTags([...props.already, tag]);
    setSearchValue('');
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = props.already.filter((selectedTag) => selectedTag !== tag);
    props.handleTags(updatedTags);
  };

  return (
    <div className="tag-container">
      <div className="selected-tags">
        {[...props.already].map((tag, index) => (
          <button key={index} onClick={() => handleRemoveTag(tag)} className="selected-tag">
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
    </div>
  );
};

export default Tag;
