import {Fragment} from 'react';
import headerLogo from '../assets/images/Marine-Coders-Logo.png';
import { Link } from "react-router-dom";

const Header = () => {
  return (
      // <header>
      <Fragment>
        <div className='flex justify-center items-center'>
        <img className='m-0' src={headerLogo} alt='Marine Coders Logo' />
        </div>
        <div className="dropdown flex justify-center ">
  <label tabIndex="0" className="btn btn-xs m-1 normal-case sm:btn-md">Letter Type</label>
  <ul tabIndex="0" className="dropdown-content menu  p-2 shadow bg-base-100 rounded-box w-52">
    {/* <li>Standard</li> */}
    <li><Link to='/'>Standard</Link></li>
    <li><Link to='/memo'>Memorandum</Link></li>
    <li><Link to='/business'>Business</Link></li>
    <li><Link to='/executive'>Executive</Link></li>
  </ul>
</div>
      </Fragment>
        
      // </header>

  );
};

export default Header;
