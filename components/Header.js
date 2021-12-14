import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Pizza</span>Paths
      </h1>
      <p className={headerStyles.decsription}>
        Find yourself while sampling the best slices your city has to offer
      </p>
      {/* <style jsx>
        {`
          .title {
            color: red;
          }
        `}
      </style> */}
    </div>
  );
};

export default Header;
