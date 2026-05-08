import React from 'react';

import Header from '@/containers/Header';

import { TAuthProps } from './Auth.types';

const Auth: React.FC<TAuthProps> = ({ children }) => {
  return (
    <div className="Auth flex items-center justify-center">
      <header className="Auth-header">
        <Header />
      </header>
      <main className="Auth-body">{children}</main>
    </div>
  );
};

export default Auth;
