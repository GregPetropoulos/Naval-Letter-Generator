import { Fragment, useState } from 'react';

const ClosingBlock = ({ initialState, data, setData }) => {
  const [copyIsChecked, setCopyIsChecked] = useState(false);
  const dataCopyTo = data.copyTo;
  // If the Copy to radio button is checked Yes, show the first input field and add button
  // If an additional VIA field is added show the remove button
  // * HANDLING THE RADIO CLICK AND SETTING THE INTIAL STATE
  const copyOnChange = () => {
    setCopyIsChecked(!copyIsChecked);
    //* ClEARING THE COPYTO STATE IF NO IS CHECKED
    //* Boolean in the function does not see the newest update true/false due to closure scope
    if (copyIsChecked === true) {
      setData((prev) => ({ ...prev, copyTo: [] }));
    } else if (copyIsChecked === false) {
      setData((prev) => ({ ...prev, copyTo: [{ cId: 1, copy: '' }] }));
    }
  };

  // * HANDLING THE ADDITION OF HTML INPUT ELEMENTS
  const addCopyInputTag = (id) => {
    setData((prev) => ({
      ...prev,
      copyTo: [...prev.copyTo, { cId: id++, copy: '' }]
    }));
  };

  // * HANDLING THE REMOVAL OF HTML INPUT ELEMENTS
  // Two ways to remove an item either by clicking remove button or click the button radio "No"
  const removeCopyInputTag = (cId) => {
    const dataCopyToItemRemoved = dataCopyTo.filter(
      (item, idx) => item.cId !== cId
    );
    setData((prev) => ({ ...prev, copyTo: dataCopyToItemRemoved }));
  };

  // * HADLING THE ONCHANGES FOR TEXT INPUTS
  const handleCopyTextInput = (e, index) => {
    const textCopyInputs = dataCopyTo;
    const { name, value } = e.target;
    textCopyInputs[index][name] = value;
    setData((prev) => ({ ...prev, copyTo: textCopyInputs }));
  };
  // Inline onChange for the Closing Block signature
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'>Closing Block</label>
      <input
        id='signature'
        value={data.signature}
        onChange={(e) =>
          setData((prev) => ({ ...prev, signature: e.target.value }))
        }
        placeholder='Enter The Signature (FI. MI. LNAME):'
        className=' text-black text-[8.5px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        type='text'
        // required
        maxLength={50}
      />
      <input
        name='title'
        id='title'
        value={data.sigTitle}
        onChange={(e) =>
          setData((prev) => ({ ...prev, sigTitle: e.target.value }))
        }
        placeholder='Enter The Signatory Title if needed:'
        className=' text-black text-[8.5px] rounded-md py-2 pl-1 pr-0 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
        type='text'
        // required
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
        ? dataCopyTo.map((item, index) => (
            <div key={index}>
              <input
                name='copy'
                id={item.cId}
                value={item.copy}
                onChange={(e) => handleCopyTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Enter An Addressee (Billet and Unit Name or identifier here):'
              />

              {/* Add button appears on last input field added */}
              {dataCopyTo.length - 1 === index && dataCopyTo.length < 10 && (
                <button
                  type='button'
                  className='btn mr-4 mb-3 btn-xs normal-case sm:btn'
                  onClick={() => addCopyInputTag(item.cId)}>
                  Add Copy To
                </button>
              )}

              {dataCopyTo.length > 1 && (
                <button
                  type='button'
                  className='btn btn-xs normal-case sm:btn'
                  onClick={() => removeCopyInputTag(item.cId)}>
                  Remove Copy
                </button>
              )}
            </div>
          ))
        : null}

      <button
        type='submit'
        className='block btn btn-xs my-3 btn-info sm:btn sm:flex sm:w-1/2 '>
        Generate Naval Letter
      </button>
      <button
        type='reset'
        onClick={()=> setData(initialState)}
        className='block btn btn-xs my-3 btn-info sm:btn sm:flex sm:w-1/2 '>
        Reset
      </button>
    </Fragment>
  );
};

export default ClosingBlock;
