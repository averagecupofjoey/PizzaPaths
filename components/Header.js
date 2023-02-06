import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Pizza</span>Paths
      </h1>
      <p className={headerStyles.description}>
        Find yourself while sampling the best slices your city has to offer
      </p>
    </div>
  );
};

export default Header;
