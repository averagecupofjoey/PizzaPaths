import Head from 'next/head';
import ArticleList from '../components/ArticleList';
import Search from '../components/Search';
import styles from '../styles/Layout.module.css';

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>PizzaPaths</title>
        <meta name='keywords' content='pizza, pizza tours, pizza slice'></meta>
      </Head>
      {/* <div className={styles.container}>
        <Search />
      </div> */}
      {/* <Search /> */}
    </div>
  );
  //the ; used to be here but taking it out didn't fix issue
}

export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=6`
  );
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};
