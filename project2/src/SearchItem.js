import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  form{
    padding: 20px;
    padding-bottom: 0px;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
`

const SearchItem = ({search, setSearch}) => {
  return (
    <StyledForm>
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
    </StyledForm>
  );
}

export default SearchItem;
