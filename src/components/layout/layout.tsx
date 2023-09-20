import Seo from '@/components/seo';

export default function Layout({ children }) {
  return (
    <>
      <Seo />
      {children}
    </>
  );
}
