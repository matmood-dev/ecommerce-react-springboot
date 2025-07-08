import Hero from '../components/homepage/Hero';
import Features from '../components/homepage/Features';
import ProductGrid from '../components/homepage/ProductGrid';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Homepage() {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <ProductGrid />
      <Footer />
    </div>
  );
}
