import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import NextApp from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

/** Stylesheets */
import '@nickgdev/hellerui/lib/index.css';
import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import '../App.css';

const appQueryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* HEAD */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* BODY */}
      <QueryClientProvider client={appQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

export default App;
