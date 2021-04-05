import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { RouterTitlePath } from '../constants/ConstTypes';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{RouterTitlePath[router.pathname]}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
