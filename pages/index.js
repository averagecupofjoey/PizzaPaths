import Head from 'next/head';
import Search from '../components/Search';
import styles from '../styles/Layout.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>PizzaPaths</title>
        <meta name='keywords' content='pizza, pizza tours, pizza slice'></meta>
      </Head>
    </div>
  );
}
