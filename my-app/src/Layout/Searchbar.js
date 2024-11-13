import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/Icons/search_icon.png';
import xIcon from '../Assets/Icons/X.png';

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = ["bear", "beach", "bee", "beige", "yellow", "fish"];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If space is detected and input is not empty
    if (value.endsWith(' ')) {
      const tagToAdd = value.trim();
      if (tags.includes(tagToAdd) && !selectedTags.includes(tagToAdd)) {
        setSelectedTags([...selectedTags, tagToAdd]);
      }
      setSearchTerm(''); // Clear input after adding tag
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear search term
    setSelectedTags([]); // Clear selected tags
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="relative w-64">
        {/* Display Selected Tags */}
        <div className="flex flex-wrap mb-2">
          {selectedTags.map((tag, index) => (
            <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"> 
              {tag}
              <button onClick={() => handleTagRemove(tag)} className="ml-2 text-blue-600">
                &times;
              </button>
            </span>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border border-blue-300 p-2 pl-90 rounded-full shadow-md focus:outline-none focus:border-blue-500"
        />

        {/* Search Icon */}
        <span className="absolute top-2 left-2 text-gray-400">
          <img src={searchIcon} alt="Search Icon" className="w-4 h-4" />
        </span>

        {/* Clear Icon */}
        {(searchTerm || selectedTags.length > 0) && (
          <button
            onClick={handleClearSearch}
            className="absolute top-2 right-2 text-gray-400">
            <img src={xIcon} alt="X Icon" className="w-4 h-4" />
          </button>
        )}

        {/* Dropdown List */}
        {searchTerm && (
          <ul className="absolute mt-1 w-full bg-white border border-gray-100 rounded shadow-md max-h-40 overflow-y-auto">
            {tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
              tags.filter(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())).map((tag, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {tag}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No tags found</li>
            )}
            <Link to="/all-tags">
              <li className="px-4 py-2 text-blue-500 cursor-pointer hover:bg-gray-100">
                view all tags...
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
