import { default as DefaultLayout } from '@/components/layouts/default.tsx'

export default function Layout({ children }) {
  return <DefaultLayout className='prose md:prose-lg max-w-[1400px] !container mt-10' >{children}</DefaultLayout>
}
