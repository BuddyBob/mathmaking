import React, { useEffect, useRef, useState } from 'react';

const Tag = () => {
  const [searchValue, setSearchValue] = useState('');
  const [matchingTags, setMatchingTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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

  const handleTagClick = (tag) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchValue('');
    inputRef.current.focus();
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = selectedTags.filter(selectedTag => selectedTag !== tag);
    setSelectedTags(updatedTags);
    inputRef.current.focus();
  };

  return (
    <div>
      <div
        contentEditable
        ref={inputRef}
        className="input-container"
        onInput={handleSearch}
      >
        {selectedTags.map((tag, index) => (
          <span key={index} className="tag" onClick={() => handleRemoveTag(tag)}>
            {tag}
          </span>
        ))}
        <span>{searchValue}</span>
      </div>
      <ul>
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
