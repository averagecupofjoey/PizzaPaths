import Head from 'next/head';
import UserMap from '../components/UserMap';

// typing racfe auto populates this for you

const about = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
      <UserMap startCoords={[40.7659937, -73.9921659]}></UserMap>
    </div>
  );
};

export default about;
