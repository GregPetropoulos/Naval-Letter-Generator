import { Fragment, useState } from 'react';

const Radios = ({ data, setData }) => {
  const [viaIsChecked, setViaIsChecked] = useState(false);
  const [refIsChecked, setRefIsChecked] = useState(false);
  const [encIsChecked, setEncIsChecked] = useState(false);

  const { via, enclosures, references } = data;

  const dataCopy = data;
  // If the VIA radio button is checked Yes, show the first input field and add button
  // If an additional VIA field is added show the remove button
  // * HANDLING THE RADIO CLICK AND SETTING THE INTIAL STATE
  const viaOnChange = (e) => {
    setViaIsChecked(!viaIsChecked);
    //* ClEARING THE VIA STATE IF NO IS CHECKED
    if (viaIsChecked === true) {
      setData((prev) => ({ ...prev, via: [] }));
    } else if (viaIsChecked === false) {
      setData((prev) => ({ ...prev, via: [{ id: 1, title: '' }] }));
    }
  };

  const refOnChange = (e) => {
    setRefIsChecked(!refIsChecked);
    //* ClEARING THE REFERENCES STATE IF NO IS CHECKED
    if (refIsChecked === true) {
      setData((prev) => ({ ...prev, references: [] }));
    } else if (refIsChecked === false) {
      setData((prev) => ({ ...prev, references: [{ id: 1, title: '' }] }));
    }
  };

  const encOnChange = (e) => {
    setEncIsChecked(!encIsChecked);
    //* ClEARING THE ENCLOSURES STATE IF NO IS CHECKED
    if (encIsChecked === true) {
      setData((prev) => ({ ...prev, enclosures: [] }));
    } else if (encIsChecked === false) {
      setData((prev) => ({ ...prev, enclosures: [{ id: 1, title: '' }] }));
    }
  };

  // * HANDLING THE ADDITION OF HTML INPUT ELEMENTS AMD STATE UPDATES
  const addViaInputTag = (id) => {
    setData((prev) => ({
      ...prev,
      via: [...prev.via, { id: id + 1, title: '' }]
    }));
  };

  const addRefInputTag = (id) => {
    setData((prev) => ({
      ...prev,
      references: [...prev.references, { id: id + 1, title: '' }]
    }));
  };

  const addEncInputTag = (id) => {
    setData((prev) => ({
      ...prev,
      enclosures: [...prev.enclosures, { id: id + 1, title: '' }]
    }));
  };

  // * HANDLING THE REMOVAL OF HTML INPUT ELEMENTS
  // Two ways to remove an item either by clicking remove button or click the button radio "No"
  const removeViaInputTag = (e, index) => {
    const inputs = data;
    const viaItemRemoved = inputs.via.filter((item, idx) => idx !== index);
    if (viaItemRemoved.length === 0) setViaIsChecked(!viaIsChecked);
    setData((prev) => ({ ...prev, via: viaItemRemoved }));
  };

  const removeRefInputTag = (e, index) => {
    const inputs = data;
    const refItemRemoved = inputs.references.filter(
      (item, idx) => idx !== index
    );
    if (refItemRemoved.length === 0) setRefIsChecked(!refIsChecked);
    setData((prev) => ({ ...prev, references: refItemRemoved }));
  };

  const removeEncInputTag = (e, index) => {
    const inputs = data;
    const encItemRemoved = inputs.enclosures.filter(
      (item, idx) => idx !== index
    );
    if (encItemRemoved.length === 0) setEncIsChecked(!encIsChecked);
    setData((prev) => ({ ...prev, enclosures: encItemRemoved }));
  };

  // * HADLING THE ONCHANGES FOR TEXT INPUTS SEPERATELY
  const handleViaTextInput = (e, index) => {
    const textViaInputs = data;
    // due to destrcuture we have access to name, value
    const { value } = e.target;
    textViaInputs.via[index].title = value;
    setData((prev) => ({ ...prev, ...textViaInputs }));
  };

  const handleRefTextInput = (e, index) => {
    const textRefInputs = data;
    // due to destrcuture we have access to name, value
    const {value } = e.target;
    textRefInputs.references[index].title = value;
    setData((prev) => ({ ...prev, ...textRefInputs }));
  };

  const handleEncTextInput = (e, index) => {
    const textRefInputs = data;
    // due to destrcuture we have access to name, value
    const {value } = e.target;
    textRefInputs.enclosures[index].title = value;
    setData((prev) => ({ ...prev, ...textRefInputs }));
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Optional Items</label>

      {/****--------------1st RADIO BUTTON AND FIELDS-----------------****/}
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
      {viaIsChecked ? (
        <div>
          {via.map((viaItem, index) => (
            <div key={index}>
              <input
                name={'title'}
                id={viaItem.id}
                value={viaItem.title}
                onChange={(e) => handleViaTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Enter The Via (Title, name of activity (Code), location when needed'
              />
              {via.length - 1 === index && via.length < 10 && (
                <div>
                  <button
                    type='button'
                    className='btn mr-4 mb-3 btn-sm sm:btn'
                    onClick={() => addViaInputTag(viaItem.id)}>
                    Add VIA
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm sm:btn'
                    onClick={(e) => removeViaInputTag(e, index)}>
                    Remove VIA
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
      {/****--------------2nd RADIO BUTTON AND FIELDS-----------------****/}
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
      {refIsChecked ? (
        <div>
          {references.map((refItem, index) => (
            <div key={index}>
              <input
                name={'references'}
                id={refItem.id}
                value={refItem.title}
                onChange={(e) => handleRefTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Ref:    (a) COMSUBGRU TWO ltr 7200 Ser N1/123 of 12 Mar 08 '
              />
              {/* Add button appears on last input field added */}
              {references.length - 1 === index && references.length < 50 && (
                <div>
                  <button
                    type='button'
                    className='btn mr-4 mb-3 btn-sm sm:btn'
                    onClick={() => addRefInputTag(refItem.id)}>
                    Add Ref
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm sm:btn'
                    onClick={(e) => removeRefInputTag(e, index)}>
                    Remove Ref
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
      {/****--------------3nd RADIO BUTTON AND FIELDS-----------------****/}
      <div className='form-control block items-center text-xs my-1 sm:text-lg'>
        <label className='mb-2 mr-2'> Do you have Enclosures</label>
        <input
          type='radio'
          name='radio-3'
          id='radio-3'
          value='3'
          checked={encIsChecked === true}
          onChange={encOnChange}
          className='radio radio-primary mx-2 radio-xs checked:bg-blue-500 sm:radio-lg sm:m-0'
        />{' '}
        Yes
        <input
          type='radio'
          name='radio-3'
          id='radio-3'
          value='3'
          checked={encIsChecked === false}
          onChange={encOnChange}
          className='radio  mx-2 radio-xs radio-primary checked:bg-red-500 sm:radio-lg'
        />
        No
      </div>
      {encIsChecked ? (
        <div>
          {enclosures.map((encItem, index) => (
            <div key={index}>
              <input
                name={'enclosures'}
                id={encItem.id}
                value={encItem.title}
                onChange={(e) => handleEncTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder={`(${
                  index + 1
                }) List of Reserve Officers Selected for Promotion to Colonel`}
              />

              {enclosures.length - 1 === index && enclosures.length < 50 && (
                <div>
                  <button
                    type='button'
                    className='btn mr-4 mb-3 btn-sm sm:btn'
                    onClick={() => addEncInputTag(encItem.id)}>
                    Add Encl
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm sm:btn'
                    onClick={(e) => removeEncInputTag(e, index)}>
                    Remove Encl
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Radios;

//*https://www.youtube.com/watch?v=XtS14dXwvwE
