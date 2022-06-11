import { Fragment } from 'react';
import Radios from './Radios';
import InputFields from './InputFields';
import BodyBlock from './BodyBlock';

const Form = () => {
  return (
    <Fragment>
      <h1 className='font-bold text-center my-3  sm:text-3xl md:text-2xl'>
        Naval Letter Format Generator
      </h1>
      <div className='flex flex-col gap-3'>
        <InputFields />
        <Radios />
        <BodyBlock />
      </div>
    </Fragment>
  );
};

export default Form;
