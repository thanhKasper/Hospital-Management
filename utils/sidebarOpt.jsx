'use client'

import React from 'react'

const SidebarOpt = ({text, bgColor, setActiveNav, children}) => {
  return (
    <div
      onClick={setActiveNav}
      className={`flex items-center w-full gap-3 px-4 py-2 rounded-md ${bgColor}`}
    >
      {children}
      <li
        className="select-none text-xl cursor-auto"
        style={{ cursor: "default" }}
      >
        {text}
      </li>
    </div>
  );
}

export default SidebarOpt