import { Fragment, useState } from 'react';

const ClosingBlock = () => {
  const [closeBlock, setCloseBlock] = useState([]);
  const [sigTitle, setSigTitle] = useState([]);
  const [copyIsChecked, setCopyIsChecked] = useState(false);
  const [addCopyInput, setAddCopyInput] = useState([]);

  // If the Copy to radio button is checked Yes, show the first input field and add button
  // If an additional VIA field is added show the remove button
  // * HANDLING THE RADIO CLICK AND SETTING THE INTIAL STATE
  const copyOnChange = () => {
    setCopyIsChecked(!copyIsChecked);
    setAddCopyInput([{ copyTo: '' }]);
  };

  // * HANDLING THE ADDITION OF HTML INPUT ELEMENTS
  const addCopyInputTag = () => {
    setAddCopyInput((prev) => [...prev, { copyTo: '' }]);
  };

  // * HANDLING THE REMOVAL OF HTML INPUT ELEMENTS
  // Two ways to remove an item either by clicking remove button or click the button radio "No"
  const removeCopyInputTag = (e, index) => {
    const inputs = [...addCopyInput];
    const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
    setAddCopyInput(arrItemRemoved);
  };

  // * HADLING THE ONCHANGES FOR TEXT INPUTS
  const handleCopyTextInput = (e, index) => {
    const textCopyInputs = [...addCopyInput];
    console.log('textcopy inputs', textCopyInputs);
    console.log('index', index);
    const { name, value } = e.target;
    textCopyInputs[index][name] = value;
    setAddCopyInput(textCopyInputs);
  };
  // Inline onChange for the Closing Block signature
// console.log(sigTitle)
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'>Closing Block</label>
      <input
        name='closeText'
        id='closeText'
        value={closeBlock.closeText}
        onChange={(e) => setCloseBlock({ [e.target.name]: e.target.value })}
        placeholder='Enter The Signature (FI. MI. LNAME):'
        className=' text-black text-[8.5px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        type='text'
        required
        maxLength={50}
      />
  <input
        name='title'
        id='title'
        value={sigTitle.tile}
        onChange={(e) => setSigTitle(({[e.target.name]: e.target.value}) )}
        placeholder='Enter The Signatory Title if needed:'
        className=' text-black text-[8.5px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        type='text'
        required
        maxLength={50}
      />

      {/****--------------4TH RADIO BUTTON AND COPY TO FIELDS-----------------****/}
      <div className='form-control block items-center text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have Copy To?</label>
        <input
          type='radio'
          name='radio-4'
          id='radio-4'
          value='4'
          checked={copyIsChecked === true}
          onChange={copyOnChange}
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg sm:m-0'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-4'
          id='radio-4'
          value='4'
          checked={copyIsChecked === false}
          onChange={copyOnChange}
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
        />
        No
      </div>
      {copyIsChecked
        ? addCopyInput.map((item, index) => (
            <div key={index}>
              <input
                name='copyTo'
                id='copyTo'
                value={item.copyTo}
                onChange={(e) => handleCopyTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Enter An Addressee (Billet and Unit Name or identifier here):'
              />

              {/* Add button appears on last input field added */}
              {addCopyInput.length - 1 === index && addCopyInput.length < 10 && (
                <button
                  type='button'
                  className='btn mr-4 mb-3 btn-sm sm:btn'
                  onClick={addCopyInputTag}>
                  Add Copy To
                </button>
              )}

              {addCopyInput.length > 1 && (
                <button
                  type='button'
                  className='btn btn-sm sm:btn'
                  onClick={(e) => removeCopyInputTag(e, index)}>
                  Remove Copy
                </button>
              )}
            </div>
          ))
        : null}

      <button className='block btn btn-sm my-3 btn-info sm:btn-lg sm:flex sm:w-1/2 '>
        Generate Naval Letter
      </button>
    </Fragment>
  );
};

export default ClosingBlock;
