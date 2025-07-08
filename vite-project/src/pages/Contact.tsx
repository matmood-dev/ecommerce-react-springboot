import Layout from '../layout/Main';
import usePageTitle from '../hooks/usePageTitle';

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Contact({ toggleTheme, isDark }: Props) {
  usePageTitle('Contact Us');

  return (
    <Layout toggleTheme={toggleTheme} isDark={isDark}>
      Contact us page content goes here.
    </Layout>
  );
}
