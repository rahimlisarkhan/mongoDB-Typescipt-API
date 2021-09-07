import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import { userStore } from '../providers/userProvider';
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { auth } = userStore()



  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <div className="logo">
          Codio
        </div>
        {auth &&
          <nav>
            <Link href="/">
              <a>Home</a>
            </Link>{' '}
            |{' '}
            <Link href="/about">
              <a>About</a>
            </Link>{' '}
            |{' '}
            <Link href="/feedback">
              <a>Feedback</a>
            </Link>{' '}
            |{' '}
          </nav>}
      </header>
      <div className="container">
        {children}
      </div>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
      <ToastContainer />
    </div>
  )

}

export default Layout
