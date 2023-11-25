import FilterSearch from '@/utils/FilterSearch'
import React from 'react'

const SearchBar = () => {
  return (
    <div className="flex mt-4">
      <FilterSearch />
      <input
        className="bg-[#F5F5F5] h-12 p-3 outline-none grow"
        type="text"
        placeholder="Search Information"
      />
      <button className="bg-[#3A4EFD] text-white font-semibold px-4 rounded-e-3xl">Search</button>
    </div>
  );
}

export default SearchBar