'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddPatientForm = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [gender, setGender] = useState('')
  const [DOB, setDOB] = useState(null)
  const [SSN, setSSN] = useState('')
  const [address, setAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    const regex = /^[0-9]+$/
    const today = new Date().toJSON().slice(0, 10)
    if (
      phoneNumber.length !== 10 ||
      !regex.test(phoneNumber) ||
      DOB > today ||
      SSN.length !== 12 ||
      !regex.test(SSN)
    ) {
      setErrorMessage('Invalid inputs')
      setIsProcessing(false)
      return
    }

    try {
      const res = await axios.post('http://localhost:3000/api/patients', {
        fname: firstName,
        lname: lastName,
        SSN,
        phone: phoneNumber,
        dob: DOB,
        address,
        gender,
      })
      router.push(`http://localhost:3000/patients/${SSN}`)
    } catch (err) {
      setIsProcessing(false)
      setErrorMessage(`${err.response.data.error}`)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-[1000px] gap-3'>
      {errorMessage.length > 0 && (
        <p className='text-lg text-red-600 text-center font-bold'>
          {errorMessage}
        </p>
      )}
      <div className='flex gap-4'>
        <div className='w-full'>
          <label className='font-semibold' htmlFor=''>
            First Name
          </label>
          <Input required onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='w-full'>
          <label className='font-semibold' htmlFor=''>
            Last Name
          </label>
          <Input required onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>
      <div className='flex gap-4'>
        <div>
          <label className='font-semibold' htmlFor=''>
            Gender
          </label>
          <Select
            required
            onValueChange={(e) => setGender(e === 'Male' ? 'M' : 'F')}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Male'>Male</SelectItem>
              <SelectItem value='Female'>Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='w-full'>
          <label className='font-semibold' htmlFor=''>
            Phone Number
          </label>
          <Input
            pattern='[0-9]*'
            minLength={10}
            maxLength={10}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <label className='font-semibold' htmlFor=''>
            Date of Birth
          </label>
          <br />
          <input
            required
            min='1900-01-01'
            max={new Date().toJSON().slice(0, 10)}
            onChange={(e) => setDOB(e.target.value)}
            type='date'
            className='h-10 rounded-md px-3 bg-input focus:outline-ring focus:outline-offset-2 focus:outline-2'
          />
        </div>
      </div>
      <div>
        <label className='font-semibold' htmlFor=''>
          SSN
        </label>
        <Input
          pattern='[0-9]*'
          minLength={12}
          maxLength={12}
          required
          className='max-w-[400px]'
          onChange={(e) => setSSN(e.target.value)}
        />
      </div>
      <div>
        <label className='font-semibold' htmlFor=''>
          Address
        </label>
        <Input required onChange={(e) => setAddress(e.target.value)} />
      </div>
      <Button
        disabled={isProcessing}
        type='submit'
        className='w-fit self-end'
        size='lg'
      >
        {isProcessing ? 'Processing...' : 'Create'}
      </Button>
    </form>
  )
}

export default AddPatientForm
