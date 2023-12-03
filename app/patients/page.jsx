"use client";

import React from "react";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import HospitalTable from "@/components/HospitalTable";

const PatientPage = () => {
  const router = useRouter();
  {
    /* navActive has these value: "Doctor", "Nurse", "Patient" */
  }
  const [navActive, setnavActive] = useState("Patient");
  const [patientList, setPatientList] = useState([]);
  const [patientDetailLinks, setPatientDetailLinks] = useState()
  const [links, setLinks] = useState([])
  const headerList = ["SSN", "Fullname", "Birth Date", "Gender", ""];

  useEffect(() => {
    async function getPatients() {
      const res = await axios.get("http://localhost:3000/api/patients");
      const query = res.data.query
      const modifiedArr = []
      const detailLinks = []
      for (let patient of query) {
        modifiedArr.push([patient.PSSN, patient.Fullname, patient.BirthDate, patient.Gender])
        detailLinks.push(`http://localhost:3000/patients/op/${patient.PSSN}`)
      }
      setPatientList(modifiedArr);
      setLinks(detailLinks)
    }

    getPatients();
  }, []);

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
        <HospitalTable headerList={headerList} contents={patientList} links={links} />
      </div>
    </div>
  );
};

export default PatientPage;
