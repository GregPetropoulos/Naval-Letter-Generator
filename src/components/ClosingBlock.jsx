import { Fragment } from 'react';

const ClosingBlock = () => {
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'>Closing Block</label>
      <input
        placeholder='Enter The Signature (FI. MI. LNAME):'
        className=' text-black text-[8.5px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        type='text'
      />

      <div className='form-control block text-xs my-1 sm:text-lg'>
        
        <label className='mb-2 mr-2 break-words'> Do you have Copy To?</label>

        <input
          type='radio'
          name='radio-4'
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-4'
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
          checked
        />
        No
      </div>
     
      <input
        className=' text-black break-words text-[8px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base  sm:pl-9 sm:pr-3'
        placeholder=' Enter An Adressee (Billet and unit Name or identifier here):'
        type='text'
      />
      <button className='block btn btn-sm my-3 btn-info sm:btn-lg sm:flex sm:w-1/2 '>Generate Naval Letter</button>
    </Fragment>
  );
};

export default ClosingBlock;
