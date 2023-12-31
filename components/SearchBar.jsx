'use client'

import FilterSearch from '@/utils/FilterSearch'
import React from 'react'
import { useState } from 'react'

const SearchBar = ({filterData, onFilter, searchData, onSearch, onShowData}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onShowData(searchData)
  }
  return (
    <form onSubmit={handleSubmit} className="flex mt-4">
      <FilterSearch filterData={filterData} onFilter={onFilter}/>
      <input
        onInput={(e) => {onSearch(e.target.value)}}
        className="bg-[#F5F5F5] h-12 p-3 outline-none grow"
        type="text"
        placeholder="Search Information"
      />
      <button type='submit' className="bg-[#3A4EFD] text-white font-semibold px-4 rounded-e-3xl">Search</button>
    </form>
  );
}

export default SearchBar