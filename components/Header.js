import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className='text-center text-[3rem] font-boogaloo'>
        <span className='text-[#f30000] '>Pizza</span>Paths
      </h1>
      <p className='text-lg md:text-[1.5rem] text-center'>
        Find yourself while sampling the best slices your city has to offer
      </p>
    </div>
  );
};

export default Header;
