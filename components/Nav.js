import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/maptest'>Test</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

//we want this to be on every page, so we send it to our layout
