"use client";

import React from "react";
import SidebarOpt from "@/utils/sidebarOpt";

const Sidebar = ({ curNav, onSetActive }) => {
  return (
    <div
      id="side-bar"
      className="bg-neutral-100 h-screen w-1/5 flex flex-col items-center justify-between py-6 px-5"
    >
      <h2 className="text-4xl font-bold">ADMIN</h2>

      <ul className="w-full flex flex-col gap-3">
        {/* Doctor nav item */}
        <SidebarOpt
          text="Doctor"
          bgColor={
            curNav == "Doctor" ? "bg-[#3A4EFD] text-white font-medium" : ""
          }
          setActiveNav={() => {
            onSetActive("Doctor");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
        </SidebarOpt>

        {/* Nurse nav item */}
        <SidebarOpt
          text="Nurse"
          bgColor={
            curNav == "Nurse" ? "bg-[#3A4EFD] text-white font-medium" : ""
          }
          setActiveNav={() => {
            onSetActive("Nurse");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M96 128V70.2c0-13.3 8.3-25.3 20.8-30l96-36c7.2-2.7 15.2-2.7 22.5 0l96 36c12.5 4.7 20.8 16.6 20.8 30V128h-.3c.2 2.6 .3 5.3 .3 8v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V136c0-2.7 .1-5.4 .3-8H96zm48 48c0 44.2 35.8 80 80 80s80-35.8 80-80V160H144v16zM111.9 327.7c10.5-3.4 21.8 .4 29.4 8.5l71 75.5c6.3 6.7 17 6.7 23.3 0l71-75.5c7.6-8.1 18.9-11.9 29.4-8.5C401 348.6 448 409.4 448 481.3c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-71.9 47-132.7 111.9-153.6zM208 48V64H192c-4.4 0-8 3.6-8 8V88c0 4.4 3.6 8 8 8h16v16c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8V96h16c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8H240V48c0-4.4-3.6-8-8-8H216c-4.4 0-8 3.6-8 8z" />
          </svg>
        </SidebarOpt>

        {/* Patient nav item */}
        <SidebarOpt
          text="Patient"
          bgColor={
            curNav == "Patient" ? "bg-[#3A4EFD] text-white font-medium" : ""
          }
          setActiveNav={() => {
            onSetActive("Patient");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 640 512"
          >
            <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
          </svg>
        </SidebarOpt>
      </ul>

      <button className="bg-[#041CF6] text-white w-full py-3 rounded-sm font-semibold">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
