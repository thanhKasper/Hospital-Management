import { Input } from "@/components/ui/input"
import { Button } from './ui/button'

const LoginCard = () => {
  return (
    <section className='flex flex-col items-center justify-center gap-7 max-w-md bg-primary px-6 h-[75vh] rounded-xl text-white -translate-x-[60%]'>
        <h1 className='text-4xl font-bold'>Login to your account</h1>
        <form className='flex flex-col gap-7 w-full'>
            <div className='flex flex-col gap-2 text-sm'>
                <div>
                    <label htmlFor="username">Username</label>
                    <Input id='username' className='mt-1'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Input id='password' className='mt-1'/>
                </div>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-black font-semibold text-lg" size='lg'>Log in</Button>
        </form>
    </section>
  )
}

export default LoginCard