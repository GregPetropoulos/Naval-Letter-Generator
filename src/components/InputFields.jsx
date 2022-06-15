import{Fragment} from 'react'

const InputFields = () => {
  return (
    <Fragment>

      <label className='sm:text-xl mt-7'> File Name Information:</label>
      <input
        className=' text-black text-xs rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter Your Desired Filename:'
        type='text'
      />
      <label className='sm:text-xl mt-7'> Address Information:</label>
      <button className='btn btn-sm mb-2 w-1/2 sm:btn'>RUC/MCC Table</button>
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 1 (Unit Name):'
        type='text'
      />
      <input
        className=' text-black text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 2 (Unit Name):'
        type='text'
      />
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 3 (Unit Name):'
        type='text'
      />
      <label className='sm:text-xl mt-7'> Header Information:</label>
      <button className='btn btn-sm mb-2 w-1/2 sm:btn'>SSIC Manual</button>
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Enter your SSIC:'
        type='text'
      />
      <input
        className=' text-black text-xs rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter Your Originator Code:'
        type='text'
      />
      <input
        className='text-black  text-xs rounded-md py-2 pl-1 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter The Date (D Mmm YY):'
        type='text'
      />
      <label className='sm:text-xl mt-7' > Reply Block:</label>
      <input
        className=' text-black text-[10px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='From (Full Identifier or Billet & Unit Name):'
        type='text'
      />
      <input
        className=' text-black text-[10px] rounded-md py-2 pl-1 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='To (Billet & unit Name or identifier here):'
        type='text'
      />
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Enter The Subject(toUpperCase()):'
        type='text'
      />
    </Fragment>

  );
};

export default InputFields;
