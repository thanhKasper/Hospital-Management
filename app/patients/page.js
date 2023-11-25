'use client'

import React from 'react'
import Sidebar from '@/components/sidebar'
import { useState, useEffect } from "react";
import SearchBar from '@/components/SearchBar';
import HospitalTable from '@/components/HospitalTable';

const PatientPage = () => {
  {/* navActive has these value: "Doctor", "Nurse", "Patient" */ }
  const [navActive, setnavActive] = useState("Patient");
  const headerList = ["SSN", "Fullname", "Birth Date", "Gender"];

  const testServer = async () => {
    const res = await fetch("/api/new-patient")
    console.log(res)
  }
  return (
    <div className="flex">
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className="w-full px-8 pt-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-5xl text-[#3A4EFD]">Patients</h1>
          <button className="bg-[#F5C005] px-4 rounded-md font-semibold" onClick={testServer}>Add Patient</button>
        </div>
        <SearchBar />
        <HospitalTable headerList={headerList} />
      </div>
    </div>
  )
}

export default PatientPage