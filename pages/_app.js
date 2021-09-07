import Head from 'next/head'
import { UserProvider } from '../providers/userProvider';
import '../sass/global.scss'
import 'react-toastify/dist/ReactToastify.css';
const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />

        <title>Optimal Club</title>

      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )
}


export default App;
