import Layout from '../layout/Main'
import usePageTitle from '../hooks/usePageTitle';

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export const Shop = ({ toggleTheme, isDark }: Props) => {
    usePageTitle('Contact Us');
  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
        Shop Page
    </Layout>
  )
}
