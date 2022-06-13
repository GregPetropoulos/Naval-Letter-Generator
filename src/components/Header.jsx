import {Fragment} from 'react';
import headerLogo from '../assets/images/Marine-Coders-Logo.png';

const Header = () => {
  return (
      // <header>
      <Fragment>
        <div className='flex justify-center items-center'>
        <img className='m-0' src={headerLogo} alt='Marine Coders Logo' />
        </div>
      </Fragment>
        
      // </header>

  );
};

export default Header;
