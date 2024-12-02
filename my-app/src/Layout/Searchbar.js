import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../Assets/Icons/search_icon.png';
import xIcon from '../Assets/Icons/X.png';

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = ["animals", "bear", "beach", "bee", "beige", "cat", "yellow", "fish", "pink", "zoo" , "ocean", "Trees", "Nature", "Weddings"];

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

  const handleTagSelect = (tagToAdd) => {
    if (!selectedTags.includes(tagToAdd)) {
      setSelectedTags([...selectedTags, tagToAdd]);
    }
    setSearchTerm(''); // Clear input after adding tag
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-96">
        <div className="flex items-center h-8 border-2 border-text-c rounded-full px-3">
          {/* Search Icon */}
          <span className="text-gray-400 mr-2 flex-shrink-0">
            <img src={searchIcon} alt="Search Icon" className="w-4 h-4" />
          </span>
        <div className="flex items-center flex-grow overflow-hidden">
        {/* Display Selected Tags */}
        <div className="flex space-x-2 h-6">
              {selectedTags.map((tag, index) => (
                <span
                  key={index} className="bg-[#CEECF5] text-blue-800 px-2 py-1 rounded-full flex items-center flex-shrink-0" title = "Remove">
                  {tag}
                  <button onClick={() => handleTagRemove(tag)} className="ml-1 text-blue-600">
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {/* Search Input */}
            <input
                type="text"
                placeholder={selectedTags.length === 0 ? " Search tags..." : ""}
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow border-none focus:outline-none text-gray-500 min-w-16"
              />
            </div>
          {/* Clear Icon */}
          <button
            onClick={handleClearSearch}
            className="text-gray-400 ml-2 flex-shrink-0"
            title = "Clear search"
          >
            <img src={xIcon} alt="X Icon" className="w-4 h-4" />
          </button>
        </div>

        {/* Dropdown List */}
        {searchTerm && (
          <ul className="absolute left-0 right-0 border-2 mt-1 bg-white border-text-c rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
            {tags.filter(tag => tag.toLowerCase().startsWith(searchTerm.toLowerCase())).length > 0 ? (
              tags
                .filter(tag => tag.toLowerCase().startsWith(searchTerm.toLowerCase()))
                .map((tag, index) => (
                  <li key={index} onClick={() => handleTagSelect(tag)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {tag}
                  </li>
                ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No tags found</li>
            )}
            <Link to="/tagslist">
              <li className="px-4 py-2 text-blue-500 cursor-pointer hover:bg-gray-100">
                View all tags...
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
