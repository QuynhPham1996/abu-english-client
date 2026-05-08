import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

import { EIconColor } from '@/components/Icon';
import configureStore from '@/redux/configureStore';
import env from '@/env';

import 'moment/locale/vi';
import '@/assets/styles/_main.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const store = configureStore();

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const AnyComponent: any = Component;
  const editorRef = useRef<any>();
  const getLayout = AnyComponent.getLayout ?? ((page: React.ReactElement) => page);

  useEffect(() => {
    editorRef.current = {
      ClassicEditor: require('ckeditor5-build/build/ckeditor'),
    };
  }, []);

  return (
    <Provider store={store}>
      <NextNProgress color={EIconColor.GERALDINE} options={{ showSpinner: false }} />

      <Head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" user-scalable="no" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={env.rootUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:image:alt" content="My Portfolio Logo" />
      </Head>

      {getLayout(<AnyComponent {...pageProps} />)}
    </Provider>
  );
};

export default MyApp;
