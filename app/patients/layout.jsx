import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'

export default async function PatientLayout({
  children, // will be a page or nested layout
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return <>{children}</>
}
