'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'
import { useState } from "react";
import SearchBar from '@/components/SearchBar';

const PatientPage = () => {
  {/* navActive has these value: "Doctor", "Nurse", "Patient" */ }
  const [navActive, setnavActive] = useState("Patient");
  return (
    <div className="flex">
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className="w-full px-8 pt-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-5xl text-[#3A4EFD]">Patients</h1>
          <button className="bg-[#F5C005] px-4 rounded-md font-semibold">Add Patient</button>
        </div>
        <SearchBar />
      </div>
    </div>
  )
}

export default PatientPage