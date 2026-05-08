import React from 'react';

import LandingHeader from '@/containers/LandingHeader';
import LandingFooter from '@/containers/LandingFooter';

import { TGuestProps } from './Guest.types';

const Guest: React.FC<TGuestProps> = ({ children }) => {
  return (
    <div className="Guest">
      <header className="Guest-header">
        <LandingHeader />
      </header>
      <main className="Guest-body">{children}</main>
      <footer className="Guest-footer">
        <LandingFooter />
      </footer>
    </div>
  );
};

export default Guest;
