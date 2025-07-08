import Hero from '../components/homepage/Hero';
import Features from '../components/homepage/Features';
import ProductGrid from '../components/homepage/ProductGrid';
import Layout from '../layout/Main';

export default function Homepage() {
  return (
    <Layout>
      <Hero />
      <Features />
      <ProductGrid />
    </Layout>
  );
}
