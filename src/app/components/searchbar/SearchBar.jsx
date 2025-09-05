import React from "react";

const SearchBar = ({ onSearch, blankOne, blankTwo }) => {
  return (
    <div className="mb-4 flex items-center space-x-2 justify-center">
      <img
        src="searchIcon.svg"
        alt="Search Icon"
        className="w-8 h-8 text-accent"
      />
      <input
        type="text"
        placeholder={`Search ${blankOne} by ${blankTwo}...`}
        onChange={(e) => onSearch(e.target.value)}
        className="w-[80%] md:w-[50%] px-4 py-2 border-b-2 border-accent focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
