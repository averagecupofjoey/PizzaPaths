//This wraps around all of your page components
// You can put header and footer here so it works everywhere
//Your global styles need to be added here
import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* <h1>Hello</h1> */}
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
