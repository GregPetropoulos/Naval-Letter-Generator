import { Fragment, useState } from 'react';

const Radios = () => {
  const [viaIsChecked, setViaIsChecked] = useState(false);
  const [refIsChecked, setRefIsChecked] = useState(false);

  const [addViaInput, setAddViaInput] = useState([]);
  const [addRefInput, setAddRefInput] = useState([]);
  console.log('addViaInput--->STATE', addViaInput);
  console.log('addRefInpu--->STATE', addRefInput);

  // If the VIA radio button is checked Yes, show the first input field and add button
  // If an additional VIA field is added show the remove button
// * HANDLING THE RADIO CLICK AND SETTING THE INTIAL STATE
  const viaOnChange = () => {
    setViaIsChecked(!viaIsChecked);
    setAddViaInput([{ via: '' }]);
  };
  const refOnChange = () => {
    setRefIsChecked(!refIsChecked);
    setAddRefInput([{ references: '' }]);
  };

  // * HANDLING THE ADDITION OF HTML INPUT ELEMENTS
  const addViaInputTag = () => {
    setAddViaInput((prev) => [...prev, { via: '' }]);
  };
  const addRefInputTag = () => {
    setAddRefInput((prev) => [...prev, { references: '' }]);
  };

  // * HANDLING THE REMOVAL OF HTML INPUT ELEMENTS
  // Two ways to remove an item either by clicking remove button or click the button radio "No"
  const removeViaInputTag = (e, index) => {
    const inputs = [...addViaInput];
    const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
    setAddViaInput(arrItemRemoved);
  };

  const removeRefInputTag = (e, index) => {
    const inputs = [...addRefInput];
    const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
    setAddRefInput(arrItemRemoved);
  };

  // * HADLING THE ONCHANGES FOR TEXT INPUTS SEPERATELY
  const handleViaTextInput = (e, index) => {
    const textViaInputs = [...addViaInput];
    // destructure
    const { name, value } = e.target;
    // access the index and name ex: at 0 index the value of via is ''
    // due to destrcuture we have access to name, value
    textViaInputs[index][name] = value;
    setAddViaInput(textViaInputs);
  };

  const handleRefTextInput = (e, index) => {
    const textRefInputs = [...addRefInput];
    const { name, value } = e.target;
    textRefInputs[index][name] = value;
    setAddRefInput(textRefInputs);
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Optional Items</label>

      <div className='form-control block items-center text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have a VIA?</label>
        <input
          type='radio'
          name='radio-1'
          id='radio-1'
          value='1'
          checked={viaIsChecked === true}
          onChange={viaOnChange}
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg sm:m-0'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-1'
          id='radio-1'
          value='1'
          checked={viaIsChecked === false}
          onChange={viaOnChange}
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
        />
        No
      </div>
      {viaIsChecked
        ? addViaInput.map((item, index) => (
            <div key={index}>
              <input
                name='via'
                id='via'
                value={item.via}
                onChange={(e) => handleViaTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Enter The Via (Title, name of activity (Code), location when needed'
              />

              {/* Add button appears on last input field added */}
              {addViaInput.length - 1 === index && addViaInput.length < 3 && (
                <button
                  type='button'
                  className='btn mr-4 btn-sm sm:btn'
                  onClick={addViaInputTag}>
                  Add VIA
                </button>
              )}

              {addViaInput.length > 1 && (
                <button
                  type='button'
                  className='btn btn-sm sm:btn'
                  onClick={(e) => removeViaInputTag(e, index)}>
                  Remove VIA
                </button>
              )}
            </div>
          ))
        : null}
      {/*!* Stopped here need to cop[y and paste therest in below here and update the youtube comment---------------2nd RADIO BUTTON AND FIELDS----------------- */}
      <div className='form-control block items-center text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have References</label>
        <input
          type='radio'
          name='radio-2'
          id='radio-2'
          value='2'
          checked={refIsChecked === true}
          onChange={refOnChange}
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg sm:m-0'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-2'
          id='radio-2'
          value='2'
          checked={refIsChecked === false}
          onChange={refOnChange}
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
        />
        No
      </div>
      {refIsChecked
        ? addRefInput.map((item, index) => (
            <div key={index}>
              <input
                name='references'
                id='references'
                value={item.references}
                onChange={(e) => handleRefTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Enter The Via (Title, name of activity (Code), location when needed'
              />

              {/* Add button appears on last input field added */}
              {addRefInput.length - 1 === index && addRefInput.length < 3 && (
                <button
                  type='button'
                  className='btn mr-4 btn-sm sm:btn'
                  onClick={addRefInputTag}>
                  Add Ref
                </button>
              )}

              {addRefInput.length > 1 && (
                <button
                  type='button'
                  className='btn btn-sm sm:btn'
                  onClick={(e) => removeRefInputTag(e, index)}>
                  Remove Ref
                </button>
              )}
            </div>
          ))
        : null}

      {/* <div className='form-control block text-xs my-1 sm:text-lg'>
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
      </div> */}
    </Fragment>
  );
};

export default Radios;

//*https://www.youtube.com/watch?v=XtS14dXwvwE
