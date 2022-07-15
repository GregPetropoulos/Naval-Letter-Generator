import { useState, Fragment } from 'react';

const InputFields = ({data,setData}) => {
  // const [inputFields, setInputFields] = useState({
  //   filename: '',
  //   line1UnitName: '',
  //   line2Address: '',
  //   line3Address: '',
  //   ssic: '',
  //   originatorCode: '',
  //   date: '',
  //   fromBilletUnitName: '',
  //   toBilletUnitName: '',
  //   subject: ''
  // });

  // const {
  //   filename,
  //   line1UnitName,
  //   line2Address,
  //   line3Address,
  //   ssic,
  //   originatorCode,
  //   date,
  //   fromBilletUnitName,
  //   toBilletUnitName,
  //   subject
  // } = inputFields;
  

  const {
    filename,
    line1UnitName,
    line2Address,
    line3Address,
    ssic,
    originatorCode,
    date,
    fromBilletUnitName,
    toBilletUnitName,
    subject
  } = data;

  // console.log(inputFields);
  // console.log("data in inputfields",data);


  const onChange = (e) => {
    // console.log('hit');
    e.preventDefault();
    const { name, value } = e.target;

    //*LOGIC HANDLING EACH FIELD VALIDATION/REQUIREMENTS
    if (name === 'subject') {
      const upperCaseSubj = value.toUpperCase();
      // setInputFields((prev) => ({ ...prev, [name]: upperCaseSubj }));
      setData((prev) => ({ ...prev, [name]: upperCaseSubj }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> File Name Information:</label>
      <input
        className=' text-black text-xs rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter Your Desired Filename:'
        type='text'
        name='filename'
        value={filename}
        onChange={onChange}
        required
        maxLength={85}
        spellCheck='true'
      />
      <label className='sm:text-xl mt-7'> Header Information:</label>
      <button className='btn btn-sm mb-2 w-1/2 sm:btn'>SSIC Manual</button>
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Enter your SSIC:'
        type='number'
        name='ssic'
        value={ssic}
        onChange={onChange}
        required
        max={5}

      />
      <input
        className=' text-black text-xs rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter Your Originator Code:'
        type='text'
        name='originatorCode'
        value={originatorCode}
        onChange={onChange}
        maxLength={47}
        required
      />
      <input
        className='text-black  text-xs rounded-md py-2 pl-1 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='Enter The Date (D Mmm YY) ex:(10 Nov 75):'
        type='text'
        name='date'
        value={date}
        onChange={onChange}
        required
        maxLength={18}
      />
      <label className='sm:text-xl mt-7'> Address Information:</label>
      <button className='btn btn-sm mb-2 w-1/2 sm:btn'>RUC/MCC Table</button>
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 1 (Unit Name):'
        type='text'
        name='line1UnitName'
        value={line1UnitName}
        onChange={onChange}
        required
        maxLength={85}
        spellCheck='true'
      />
      <input
        className=' text-black text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 2 (Address Line 1):'
        type='text'
        name='line2Address'
        value={line2Address}
        onChange={onChange}
        required
        maxLength={47}

      />
      <input
        className='text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Line 3 (Address Line 2):'
        type='text'
        name='line3Address'
        value={line3Address}
        onChange={onChange}
        maxLength={47}

      />

      <label className='sm:text-xl mt-7'> Reply Block:</label>
      <input
        className=' text-black text-[10px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='From (Full Identifier or Billet & Unit Name):'
        type='text'
        name='fromBilletUnitName'
        value={fromBilletUnitName}
        onChange={onChange}
        required
        maxLength={85}

      />
      <input
        className=' text-black text-[10px] rounded-md py-2 pl-1 pr-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        placeholder='To (Billet & unit Name or identifier here):'
        type='text'
        name='toBilletUnitName'
        value={toBilletUnitName}
        onChange={onChange}
        required
        maxLength={85}

      />
      <input
        spellCheck='true'
        className=' text-black  text-xs rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base'
        placeholder='Subject:All Caps'
        type='text'
        name='subject'
        value={subject}
        onChange={onChange}
        required
        maxLength={85}


      />
    </Fragment>
  );
};

export default InputFields;
