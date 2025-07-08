import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Layout({ children, toggleTheme, isDark }: Props) {
  return (
    <PageWrapper>
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <Main>{children}</Main>
      <Footer />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;
