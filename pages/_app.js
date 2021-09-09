import Head from 'next/head'
import { UserProvider } from '../providers/userProvider';
import Layout from '../components/Layout'
// import  {AppProps} from 'next/app'
import '../sass/global.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = ({ Component, pageProps }) => {
  
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />

        <title>Optimal Club</title>

      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
      <ToastContainer />
    </>
  )
}


export default App;
