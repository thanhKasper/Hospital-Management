"use client";

import React from "react";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import HospitalTable from "@/components/HospitalTable";

const PatientPage = () => {
  const router = useRouter();
  {
    /* navActive has these value: "Doctor", "Nurse", "Patient" */
  }
  const [navActive, setnavActive] = useState("Patient");
  const headerList = ["SSN", "Fullname", "Birth Date", "Gender", ""];

  return (
    <div className="flex">
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className="w-full px-8 pt-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-5xl text-[#3A4EFD]">Patients</h1>
          <button
            onClick={() => {
              router.push("../add-patient");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 px-4 rounded-md font-semibold"
          >
            Add Patient
          </button>
        </div>
        <SearchBar />
        <HospitalTable headerList={headerList} />
      </div>
    </div>
  );
};

export default PatientPage;
