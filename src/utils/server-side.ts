import * as cookie from 'cookie';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Paths } from '@/routers/constants';
import { COOKIE_ACCESS_TOKEN } from '@/services/helpers';

export const ServerProtectedRoute = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie || '');
  const atk = parsedCookies?.[COOKIE_ACCESS_TOKEN];

  if (!atk) {
    return {
      redirect: {
        permanent: false,
        destination: Paths.Login,
      },
    };
  }

  return { props: {} };
};


export const ServerAuthRoute = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const parsedCookies = cookie.parse(context.req.headers.cookie || '');
  const atk = parsedCookies?.[COOKIE_ACCESS_TOKEN];

  if (atk) {
    return {
      redirect: {
        permanent: false,
        destination: Paths.RoleNavigate,
      },
    };
  }

  return { props: {} };
};
