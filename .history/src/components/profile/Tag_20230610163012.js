import './Tag.css';

import React, { useState } from 'react';

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

  return (
    <div className="tag-container">
      <div className="selected-tags">
        hdhfdhfh
        {[...selectedTags, ...props.already].map((tag, index) => (
          <button
            key={index}
            onClick={() => handleRemoveTag(tag)}
            className={selectedTags.includes(tag) ? 'selected' : ''} // Add the 'selected' class if the tag is selected
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
      <input type="button" name="tags" value={selectedTags} />
    </div>
  );
};

export default Tag;
