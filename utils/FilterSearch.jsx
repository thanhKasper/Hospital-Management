"use client";

import React from "react";
import { useState } from "react";

const FilterSearch = ({filterData, onFilter}) => {
  const [isDropdown, setDropdown] = useState(false);

  const selectionStyle = {
    position: "absolute",
    right: "0px",
    width: "100%",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem 0.5rem 0.75rem",
    display: isDropdown ? "block" : "none",
  };

  return (
    <div className="relative" style={{ position: "relative" }}>
      <div
        className="px-4 h-full flex bg-[#3A4EFD] items-center gap-3 rounded-s-3xl"
        onClick={() => {
          setDropdown(oldState => !oldState);
        }}
      >
        <p className="text-white font-semibold">{filterData}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path
            fill="#FFFFFF"
            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
          />
        </svg>
      </div>
      <ul
        className="absolute bg-[#F5F5F5] rounded-xl pl-4 z-30"
        style={selectionStyle}
      >
        <li
          className="p-1 rounded-md mb-2 cursor-default hover:bg-primary hover:text-white"
          onClick={() => {
            // setFilterCriteria("Filter By Patient");
            onFilter("Filter By Patient")
            setDropdown(false);
          }}
        >
          Filter By Patient
        </li>
        <li
          className="p-1 rounded-md mb-2 cursor-default hover:bg-primary hover:text-white"
          onClick={() => {
            onFilter("Filter By Doctor");
            setDropdown(false);
          }}
        >
          Filter By Doctor
        </li>
      </ul>
    </div>
  );
};

export default FilterSearch;
