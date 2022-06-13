import { Fragment } from 'react';

const Radios = () => {
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Optional Items</label>

      <div className='form-control block items-center text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have a VIA?</label>
        <input
          type='radio'
          name='radio-1'
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg sm:m-0'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-1'
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
          checked
        />
        No
      </div>
      <div className='form-control block text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have References?</label>
        <input
          type='radio'
          name='radio-2'
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-2'
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
          checked
        />
        No
      </div>

      <div className='form-control block text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have Enclosures?</label>
        <input
          type='radio'
          name='radio-3'
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-3'
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
          checked
        />
        No
      </div>
    </Fragment>
  );
};

export default Radios;
