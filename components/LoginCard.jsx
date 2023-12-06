'use client'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginCard = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false
    })
    if (!res?.error) {
      router.push('/patients')
    }
    else {
      setErrorMessage('Unauthorized')
    }
  }
  return (
    <section className='flex flex-col items-center justify-center gap-7 max-w-md bg-primary px-6 h-[75vh] rounded-xl text-white -translate-x-[60%] relative'>
      {errorMessage.length > 0 && (<p className='text-red-600 bg-white px-3 py-2 absolute top-3 right-3 left-3 rounded-lg font-bold'>Unauthorized</p>)}
      <h1 className='text-4xl font-bold'>Login to your account</h1>
      <form onSubmit={handleLogin} className='flex flex-col gap-7 w-full'>
        <div className='flex flex-col gap-2 text-sm'>
          <div>
            <label htmlFor='username'>Username</label>
            <Input
              id='username'
              className='mt-1'
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              id='password'
              className='mt-1'
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </div>
        <Button
          className='bg-accent hover:bg-accent/90 text-black font-semibold text-lg'
          size='lg'
        >
          Log in
        </Button>
      </form>
    </section>
  )
}

export default LoginCard
