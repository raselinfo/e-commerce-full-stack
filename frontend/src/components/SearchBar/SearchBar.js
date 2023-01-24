import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const handleOnSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/search?query=${searchText}`);
    }
  };
  return (
    <form className={`flex items-center ${className} searchBox`}>
      <input
        className=' rounded-l-lg p-3 '
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={handleOnSearch}
        className='bg-yellow-500 p-3 rounded-r-lg'
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
