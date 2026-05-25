import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Page = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (token) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}
export default Page;