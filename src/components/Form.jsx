import { Fragment } from 'react';
import Radios from './Radios';
import InputFields from './InputFields';
import BodyBlock from './BodyBlock';
import ClosingBlock from './ClosingBlock';
import Footer from './Footer';

const Form = ({data,setData}) => {
  return (
    <Fragment>
    {/* // <div className='form-control'> */}
      <h1 className='font-bold text-center my-3  sm:text-3xl md:text-2xl'>
        Naval Letter Format Generator
      </h1>
      <form className=' form flex flex-col gap-3'>
        <InputFields data={data} setData={setData}/>
        <Radios data={data} setData={setData}/>
        <BodyBlock />
        <ClosingBlock/>
        <Footer/>
      </form>
    {/* // </div> */}
    </Fragment>
  );
};

export default Form;
