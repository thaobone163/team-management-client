import Layout from '@/components/layout'
import '@/styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  })

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
