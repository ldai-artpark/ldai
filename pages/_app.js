import '../styles/globals.css'
import Head from "next/head";
import setup from "../setup";
import {wrapper} from "../store/store";
import {UserProvider} from "@auth0/nextjs-auth0";
import useTheme from "@newron/common/hooks/useTheme";

import { MyContextProvider } from "../contexts/MyContext";

function MyApp({ Component, pageProps }) {

  useTheme();

  return <>
    <Head>
      <title>
        {setup.projectName}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <UserProvider>
        <MyContextProvider>
            <Component {...pageProps} />
        </MyContextProvider>
    </UserProvider>
  </>
}


export default wrapper.withRedux(MyApp)
