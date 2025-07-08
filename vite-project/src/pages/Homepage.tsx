import Layout from '../layout/Main';
import usePageTitle from '../hooks/usePageTitle';
import HeroSection from '../components/homepage/HeroSection';
import FeaturesSection from '../components/homepage/FeaturesSection';
import CategoriesSection from '../components/homepage/CategoriesSection';
import NewArrivalsSection from '../components/homepage/NewArrivalsSection';

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Homepage({ toggleTheme, isDark }: Props) {
  usePageTitle('Homepage');

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <NewArrivalsSection />
    </Layout>
  );
}
