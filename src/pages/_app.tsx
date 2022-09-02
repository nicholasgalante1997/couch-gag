import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

/** Stylesheets */
import '@nickgdev/hellerui/lib/index.css';
import '@nickgdev/couch-gag-common-lib/lib/heller.css';
import '../App.css';

const appQueryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={appQueryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps };
};

export default App;
