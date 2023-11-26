'use client'

import Sidebar from '@/components/sidebar'
import { useState } from 'react'
import AddPatientForm from '@/components/AddPatientForm'

const InpatientPage = () => {
  const [navActive, setnavActive] = useState('Patient')
  return (
    <section className='flex'>
      <Sidebar curNav={navActive} onSetActive={setnavActive} />
      <div className='w-full px-8 pt-6'>
        <div className='flex justify-between items-center'>
          <h1 className='font-semibold text-5xl text-primary'>
            Patient Details
          </h1>
          <button className='flex items-center gap-3 bg-secondary px-4 rounded-full font-semibold text-white h-fit py-2'>
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
        <main className='flex justify-center mt-4'>
          <AddPatientForm />
        </main>
      </div>
    </section>
  )
}

export default InpatientPage
