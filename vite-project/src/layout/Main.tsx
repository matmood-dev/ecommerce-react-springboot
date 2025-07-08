import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Layout({ children, toggleTheme, isDark }: Props) {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
