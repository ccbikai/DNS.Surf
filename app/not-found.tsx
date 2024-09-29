import image from '!!raw-loader!../assets/404.svg'
import Layout from '@/components/layouts/default'

export default function NotFound() {
  return (
    <Layout>
      <a
        className="mx-auto flex h-full w-full max-w-[600px] items-center justify-center [&_svg]:w-full"
        href="/"
        dangerouslySetInnerHTML={{ __html: image }}
      >
      </a>
    </Layout>
  )
}
