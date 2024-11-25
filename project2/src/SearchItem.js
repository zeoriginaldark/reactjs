import React from 'react';
import './SearchItem.css';

const SearchItem = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <input
            id="search"
            type="text"
            role="searchbox"
            placeholder="Search Item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </form>
  );
}

export default SearchItem;
