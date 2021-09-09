import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Meta } from '../Meta/Meta';


type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <div>
      <Head>
        <Meta />
        <title>{title}</title>
      </Head>
      <Header />
      <div className="container">
        {children}
      </div>
      <Footer />
    </div>
  )
}

