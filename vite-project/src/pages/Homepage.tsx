import Layout from '../layout/Main';
import Hero from '../components/homepage/Hero';
import usePageTitle from '../hooks/usePageTitle';

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Homepage({ toggleTheme, isDark }: Props) {
  usePageTitle('Homepage');

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <Hero />
    </Layout>
  );
}
