import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <Footer />
    </div>
  );
}
