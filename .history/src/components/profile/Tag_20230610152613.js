import React, { useState } from 'react';

const Tag = () => {
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
    const tags = ['javascript', 'react', 'node.js', 'css', 'html', 'typescript', 'redux', 'express'];

    // Filter the tags based on the search query and limit the results to maximum 5 tags
    const matchedTags = tags
      .filter(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5);

    return matchedTags;
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search tags"
      />
      <ul>
        {matchingTags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tag;
