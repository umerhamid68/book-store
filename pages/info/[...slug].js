import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function InfoPage() {
  const router = useRouter();
  const { slug } = router.query;

  let content=(
        <>
          <h1>{slug}</h1>
        </>
      );

  return (
    <Layout>
      {content}
      <Link href="/info">Back to Information</Link>
    </Layout>
  );
}