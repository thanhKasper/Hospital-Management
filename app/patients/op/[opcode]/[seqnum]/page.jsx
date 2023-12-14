'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import HospitalTable from '@/components/HospitalTable'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'

const OutPatientPage = () => {
  const router = useRouter()
  const params = useParams()
  const queryStr = useSearchParams()
  const [navActive, setnavActive] = useState('Patient')
  const headerList = ['Medication Code', 'Name', 'Price', 'Quantity (pill/vial)', '']
  const [medList, setMedList] = useState([])
  const [links, setLinks] = useState([])
  const [examinationDetail, setExaminationDetail] = useState({})
  const [isTableLoading, setIsTableLoading] = useState(true)

  // Get all path parameter from the link
  const opCode = params.opcode
  const examinationID = params.seqnum
  const docCode = queryStr.get('empCode')

  useEffect(() => {
    async function retrieveExaminationDetail() {
      const res = await axios.get(
        `http://localhost:3000/api/examinationDetail?exId=${examinationID}&opCode=${opCode}&empCode=${docCode}`
      )
      const detail = res.data.query
      console.log(detail)
      setExaminationDetail(detail)

      // Retrieve list of medication needed
      // Foreign key for examination
      const res2 = await axios.get(
        `http://localhost:3000/api/exMedications?opCode=${opCode}&empCode=${docCode}&exId=${examinationID}`
      )
      const list = res2.data.query
      // console.log(list)
      const formatMed = []
      const linkArr = []
      for (let med of list) {
        formatMed.push([med.MedCode, med.MedName, med.Price, med.ExamMedQuantity])
        linkArr.push('/')
      }
      setMedList(formatMed)
      setLinks(linkArr)
      setIsTableLoading(false)
    }

    retrieveExaminationDetail()
  }, [])
  // console.log(examinationDetail)

  return (
    <section className='flex '>
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className='w-full px-8 pt-6'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-5xl text-primary'>
            Examination Details
          </h1>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-3 bg-secondary px-4 rounded-full font-semibold text-white h-fit py-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 448 512'
            >
              <path
                fill='white'
                d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
              />
            </svg>
            Back
          </button>
        </div>
        {/* Main section of the inpatient */}
        <main className='flex justify-between mt-4'>
          <div className='grid gap-x-10 grid-cols-2'>
            <p className='font-semibold'>OPCode:</p>
            <p>{examinationDetail.ExaminationOPID}</p>
            <p className='font-semibold'>Date:</p>
            <p>{examinationDetail.Date}</p>
            <p className='font-semibold'>Re-examination Date:</p>
            <p>{examinationDetail.NextDate}</p>
            <p className='font-semibold'>Diagnosis:</p>
            <p>{examinationDetail.ExaminationDiagnosis}</p>
            <p className='font-semibold'>Fee:</p>
            <p>{examinationDetail.Fee}</p>
            <p className='font-semibold'>Total Fee (including medicine price):</p>
            <p>{examinationDetail.TotalExpense}</p>
          </div>
          <div className='flex flex-col'>
            <div className='grid gap-x-3 grid-cols-2 h-fit'>
              <p className='font-semibold'>Doctor Name:</p>
              <p>{examinationDetail.DocName}</p>
              <p className='font-semibold'>Doctor Code:</p>
              <p>{docCode}</p>
            </div>
            <button className='flex gap-3 items-center bg-secondary font-semibold text-white px-5 py-1 mt-2 rounded-full w-fit'>
              See Doctor Detail
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='1em'
                viewBox='0 0 448 512'
              >
                <path
                  fill='white'
                  d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z'
                />
              </svg>
            </button>
          </div>
        </main>
        <h2 className='text-4xl font-bold mt-4'>Medications</h2>
        {isTableLoading ? (
          <p className='text-center text-lg font-bold'>Loading...</p>
        ) : (
          <HospitalTable
            headerList={headerList}
            contents={medList}
            links={links}
          />
        )}
      </div>
    </section>
  )
}

export default OutPatientPage
