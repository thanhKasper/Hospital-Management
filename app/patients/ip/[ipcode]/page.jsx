"use client";

import HospitalTable from "@/components/HospitalTable";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";

const InpatientPage = ({ params }) => {
  const router = useRouter();
  const [navActive, setnavActive] = useState("Patient");
  const headerList = ["IPCode", "Admission date", "Discharge date", "Fee", ""];
  const [patientInfo, setPatientInfo] = useState({});
  const [infoList, setInfoList] = useState([]);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    let opCode, ipCode;
    async function retrievePatientInfo() {
      const code = params.ipcode; // Get the path parameter indicating patient SSN
      const result = await axios.get(
        `http://localhost:3000/api/getPatient?id=${code}`
      );
      const patientInfo = result.data.query[0];
      opCode = result.data.opCode;
      ipCode = result.data.ipCode;
      patientInfo.ipCode = ipCode || "N/A";
      patientInfo.opCode = opCode || "N/A";
      setPatientInfo(patientInfo);
    }

    async function getInfoDetail() {
      if (ipCode) {
        const res = await axios.get(
          `http://localhost:3000/api/info?ipCode=${ipCode}`
        );
        const formattedInfoList = [];
        const detailLinks = [];
        for (let info of res.data.query) {
          formattedInfoList.push([
            info.IPID,
            info.AdmissionDate,
            info.DischargeDate,
            info.Fee,
          ]);
          detailLinks.push(
            window.location.href + "/" + info.InfoSeq
          );
        }
        console.log(detailLinks)
        setInfoList(formattedInfoList);
        setLinks(detailLinks)
      } else {
        setLinks([]);
        setInfoList([]);
      }
    }

    retrievePatientInfo().then(getInfoDetail);
  }, []);

  return (
    <section className="flex">
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className="w-full px-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-5xl text-primary">
            Patient Details
          </h1>
          <button className="flex items-center gap-3 bg-secondary px-4 rounded-full font-semibold text-white h-fit py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path
                fill="white"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
            Back
          </button>
        </div>
        <main className="flex justify-between mt-4">
          <div className="grid gap-x-10 grid-cols-2">
            <p className="font-semibold">SSN:</p>
            <p>{patientInfo.PSSN}</p>
            <p className="font-semibold">IPCode:</p>
            <p>{patientInfo.ipCode}</p>
            <p className="font-semibold">OPCode:</p>
            <p>{patientInfo.opCode}</p>
            <p className="font-semibold">Full Name:</p>
            <p>{patientInfo.FName + " " + patientInfo.LName}</p>
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-3 h-fit">
              <p className="font-semibold">Date of Birth:</p>
              <p className="col-span-2">{patientInfo.BirthDate}</p>
              <p className="font-semibold">Phone number:</p>
              <p className="col-span-2">{patientInfo.PatPhoneNumber}</p>
              <p className="font-semibold">Gender:</p>
              <p className="col-span-2">{patientInfo.Gender}</p>
              <p className="font-semibold">Address:</p>
              <p className="col-span-2">{patientInfo.Address}</p>
            </div>
            <div className="flex justify-end items-center gap-3">
              <button className="bg-accent font-semibold text-black px-5 py-2 mt-2 rounded-full w-fit hover:bg-accent/90">
                Add inpatient visit
              </button>
              <button className="bg-accent font-semibold text-black px-5 py-2 mt-2 rounded-full w-fit hover:bg-accent/90">
                Add examination
              </button>
            </div>
          </div>
        </main>
        <div className="flex items-center gap-3 mt-4">
          <h2 className="text-4xl font-semibold">History</h2>
          <Select
            onValueChange={e => {
              if (e == "Inpatient") {
                router.push(
                  `http://localhost:3000/patients/ip/${patientInfo.PSSN}`
                );
              } else {
                router.push(
                  `http://localhost:3000/patients/op/${patientInfo.PSSN}`
                );
              }
            }}
          >
            <SelectTrigger className="w-[120px] rounded-full bg-primary text-white font-bold focus-visible:ring-primary">
              <SelectValue placeholder="Inpatient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inpatient">Inpatient</SelectItem>
              <SelectItem value="Outpatient">Outpatient</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <HospitalTable headerList={headerList} contents={infoList} links={links} />
      </div>
    </section>
  );
};

export default InpatientPage;
