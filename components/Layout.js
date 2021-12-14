import Nav from './Nav';
import Header from './Header';
import Search from './Search';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    // the empty brackets below follow react's rules of only returning one parent
    <>
      <Nav />

      <div className={styles.container}>
        <main className={styles.main}>
          <Header />
          <Search />
          {children}
        </main>
      </div>
    </>
  );
  //I think this line above is forcing the ;
};

export default Layout;
