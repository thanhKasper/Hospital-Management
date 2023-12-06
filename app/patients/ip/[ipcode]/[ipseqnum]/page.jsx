"use client";

import HospitalTable from "@/components/HospitalTable";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const InpatientPage = ({ params }) => {
  const router = useRouter();
  const [infoDetails, setPatientInfo] = useState({});
  const [navActive, setnavActive] = useState("Patient");
  const headerList = ["IPCode", "Start date", "End date", "Status", ""];
  const [treatmentList, setTreatmentList] = useState([]);
  const [links, setLinks] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  useEffect(() => {
    const ipcode = params.ipcode;
    const ipseqnum = params.ipseqnum;

    async function getInfoDetails() {
      const result = await axios.get(
        `http://localhost:3000/api/info/${ipcode}/${ipseqnum}`
      );
      const info = result.data.query[0];
      setPatientInfo(info);
    }
    const getTreatments = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/api/treatments/${ipcode}/${ipseqnum}`
        );
        const formattedTreatmentList = [];
        const detailLinks = [];
        for (let treatment of result.data.query) {
          formattedTreatmentList.push([
            treatment.TreatmentIPID,
            treatment.StartDate,
            treatment.EndDate,
            treatment.IsRecovered,
          ]);
          detailLinks.push(
            window.location.href +
              "/" +
              treatment.TreatmentSeq +
              `?doctorCode=${treatment.TreatmentDoctorCode}`
          );
        }
        setLinks(detailLinks);
        setTreatmentList(formattedTreatmentList);
        setIsTableLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    Promise.all([getInfoDetails(), getTreatments()]);
  }, []);
  return (
    <section className="flex">
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className="w-full px-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-5xl text-primary">
            Inpatient Details
          </h1>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 bg-secondary px-4 rounded-full font-semibold text-white h-fit py-2"
          >
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
            <p className="font-semibold">IPCode:</p>
            <p>{infoDetails.IPID}</p>
            <p className="font-semibold">Sick room:</p>
            <p>{infoDetails.Sickroom}</p>
            <p className="font-semibold">Admission Date:</p>
            <p>{infoDetails.AdmissionDate}</p>
            <p className="font-semibold">Discharge Date:</p>
            <p>{infoDetails.DischargeDate}</p>
            <p className="font-semibold">Diagnosis:</p>
            <p>{infoDetails.InfoDiagnosis}</p>
            <p className="font-semibold">Fee:</p>
            <p>{infoDetails.Fee}</p>
          </div>
          <div className="flex flex-col">
            <div className="grid gap-x-3 grid-cols-2 h-fit">
              <p className="font-semibold">Nurse:</p>
              <p>{infoDetails.NurseName}</p>
              <p className="font-semibold">Nurse Code:</p>
              <p>{infoDetails.TCareNurseCode}</p>
            </div>
            <button className="flex gap-3 items-center bg-secondary font-semibold text-white px-5 py-1 mt-2 rounded-full w-fit">
              See Nurse Detail
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  fill="white"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </button>
          </div>
        </main>
        <h2 className="text-4xl font-bold mt-4">Treatments</h2>
        {isTableLoading ? (
          <p className="text-center text-lg font-bold">Loading...</p>
        ) : (
          <HospitalTable
            headerList={headerList}
            contents={treatmentList}
            links={links}
          />
        )}
      </div>
    </section>
  );
};

export default InpatientPage;
