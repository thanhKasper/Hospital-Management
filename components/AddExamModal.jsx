'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export function AddExamModal({ SSN, OPCode }) {
  const router = useRouter()
  const [doctorCode, setDoctorCode] = useState(-1)
  const [diagnosis, setDiagnosis] = useState(null)
  const [fee, setFee] = useState(null)
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
  const [nextDate, setNextDate] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const handleSubmit = async (e) => {
    setIsProcessing(true)
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:3000/api/examinationDetail',
        {
          SSN,
          OPCode: OPCode === 'N/A' ? null : OPCode,
          doctorCode,
          diagnosis,
          fee,
          date,
          nextDate,
        }
      )
      const op = res.data.op
      const seq = res.data.seq
      router.push(`http://localhost:3000/patients/op/${op}/${seq}`)
    } catch (err) {
      setIsProcessing(false)
      setErrorMessage(`${err.response.data.error}`)
    }
  }
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/doctors')
        const data = res.data.query
        console.log(data)
        setDoctors(data)
      } catch (err) {
        console.error(err)
      }
    }
    getDoctors()
  }, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-accent font-semibold text-black px-5 py-2 mt-2 rounded-full w-fit hover:bg-accent/90'>
          Add examination
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create Examination</DialogTitle>
          <DialogDescription className='text-primary'>
            Create a new examination for this patient
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-3'
        >
          {errorMessage.length > 0 && (
            <p className='text-lg text-red-600 text-center font-bold'>
              {errorMessage}
            </p>
          )}
          <div className='w-full'>
            <label className='font-semibold' htmlFor=''>
              Examine Doctor{' '}
              <span className='text-xs font-normal'>(Required)</span>
            </label>
            <Select
              className='w-full'
              required
              onValueChange={(e) => setDoctorCode(parseInt(e))}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Doctor' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {doctors.map((doctor) => (
                    <SelectItem
                      key={doctor.EmpCode}
                      value={`${doctor.EmpCode}`}
                    >
                      {doctor.Fullname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='w-full'>
            <label className='font-semibold' htmlFor=''>
              Diagnosis <span className='text-xs font-normal'>(Required)</span>
            </label>
            <Input required onChange={(e) => setDiagnosis(e.target.value)} />
          </div>
          <div className='w-full'>
            <label className='font-semibold' htmlFor=''>
              Fee <span className='text-xs font-normal'>(Not required)</span>
            </label>
            <Input pattern='[0-9]*' onChange={(e) => setFee(e.target.value)} />
          </div>
          <div className='grid grid-cols-2 gap-x-16'>
            <div className=''>
              <label className='font-semibold' htmlFor=''>
                Date <span className='text-xs font-normal'>(Required)</span>
              </label>
              <br />
              <input
                required
                defaultValue={new Date().toJSON().slice(0, 10)}
                type='date'
                className='h-10 rounded-md px-3 bg-input focus:outline-ring focus:outline-offset-2 focus:outline-2 w-full'
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className=''>
              <label className='font-semibold' htmlFor=''>
                Next Date{' '}
                <span className='text-xs font-normal'>(Not required)</span>
              </label>
              <br />
              <input
                type='date'
                className='h-10 rounded-md px-3 bg-input focus:outline-ring focus:outline-offset-2 focus:outline-2 w-full'
                onChange={(e) => setNextDate(e.target.value)}
              />
            </div>
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
