import Layout from '../layout/Main';
import Hero from '../components/homepage/Hero';
import usePageTitle from '../hooks/usePageTitle';

export default function Homepage() {
  usePageTitle('Homepage');
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
