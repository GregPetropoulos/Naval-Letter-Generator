import { Fragment, useState } from 'react';

const Radios = ({ data, setData }) => {
  const [viaIsChecked, setViaIsChecked] = useState(false);
  // const [refIsChecked, setRefIsChecked] = useState(false);
  // const [encIsChecked, setEncIsChecked] = useState(false);

  // const [addViaInput, setAddViaInput] = useState([]);
  // const [addRefInput, setAddRefInput] = useState([]);
  // const [addEncInput, setAddEncInput] = useState([]);

  const { via, enclosures, references } = data;

  const dataCopy = data;
  // If the VIA radio button is checked Yes, show the first input field and add button
  // If an additional VIA field is added show the remove button
  // * HANDLING THE RADIO CLICK AND SETTING THE INTIAL STATE
  const viaOnChange = (e) => {
    setViaIsChecked(!viaIsChecked);
    //* ClEARING THE VIA STATE IF NO IS CHECKED
    if (viaIsChecked === true) {
      setData((prev) =>
        prev.via.length > 0
          ? { ...prev, via: [{ id:1, title: '' }] }
          : prev
      );
    }
  };
  // const refOnChange = () => {
  //   setRefIsChecked(!refIsChecked);
  //   setAddRefInput([{ references: '' }]);
  // };

  // const encOnChange = () => {
  //   setEncIsChecked(!encIsChecked);
  //   setAddEncInput([{ enclosures: '' }]);
  // };

  // * HANDLING THE ADDITION OF HTML INPUT ELEMENTS AMD STATE UPDATES
  const addViaInputTag = (id) => {
 
    setData((prev) => ({...prev, via:[...prev.via,{id:id++, title:''}]}))
  };
  // const addRefInputTag = () => {
  //   setAddRefInput((prev) => [...prev, { references: '' }]);
  // };
  // const addEncInputTag = () => {
  //   setAddEncInput((prev) => [...prev, { enclosures: '' }]);
  // };
  // * HANDLING THE REMOVAL OF HTML INPUT ELEMENTS
  // Two ways to remove an item either by clicking remove button or click the button radio "No"
  const removeViaInputTag = (e, index) => {
    // const inputs = [...addViaInput];
    // setAddViaInput(arrItemRemoved);
    const inputs = [...data];
    const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
    setData(arrItemRemoved);
  };

  // const removeRefInputTag = (e, index) => {
  //   const inputs = [...addRefInput];
  //   const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
  //   setAddRefInput(arrItemRemoved);
  // };
  // const removeEncInputTag = (e, index) => {
  //   const inputs = [...addEncInput];
  //   const arrItemRemoved = inputs.filter((item, idx) => idx !== index);
  //   setAddEncInput(arrItemRemoved);
  // };

  // * HADLING THE ONCHANGES FOR TEXT INPUTS SEPERATELY
  const handleViaTextInput = (e, index) => {
    const textViaInputs = data;
    // due to destrcuture we have access to name, value
    const { name, id, value } = e.target;
    textViaInputs.via[index].title = value;
    setData((prev) => ({ ...prev, ...textViaInputs }));
  };

  // const handleRefTextInput = (e, index) => {
  //   const textRefInputs = [...addRefInput];
  //   const { name, value } = e.target;
  //   textRefInputs[index][name] = value;
  //   setAddRefInput(textRefInputs);
  // };

  // const handleEncTextInput = (e, index) => {
  //   const textEncInputs = [...addEncInput];
  //   const { name, value } = e.target;
  //   textEncInputs[index][name] = value;
  //   setAddEncInput(textEncInputs);
  // };

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
          {via.map(
            (viaItem, index) => (
              <div key={index}>
                <input
                  // name={`${viaItem.name}-${viaItem.id}`}
                  // id={`${viaItem.name}-${viaItem.id}`}
                  name={'title'}
                  // id={'title'}
                  id={viaItem.id}
                  value={viaItem.title}
                  onChange={(e) => handleViaTextInput(e, index)}
                  type='text'
                  className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                  placeholder='Enter The Via (Title, name of activity (Code), location when needed'
                />
              
                  <button
                  type='button'
                  className='btn mr-4 mb-3 btn-sm sm:btn'
                  onClick={()=> addViaInputTag(viaItem.id)}>
                    Add VIA
                  </button>
                    </div>
                      )

            //  {dataCopy.length > 1 && (
            //    <button
            //      type='button'
            //      className='btn btn-sm sm:btn'
            // //     // onClick={(e) => removeViaInputTag(e, index)}
            //    onClick={(e) => removeViaInputTag(e)}
            //      >
            //    Remove VIA
            //   </button>
            // )}
          )}

            {/* <button
                  type='button'
                  className='btn mr-4 mb-3 btn-sm sm:btn'
                  onClick={addViaInputTag}>
                    Add VIA
                  </button> */}
        </div>
      ) : null}

      {/****--------------2nd RADIO BUTTON AND FIELDS-----------------****/}
      {/* <div className='form-control block items-center text-xs my-1 sm:text-lg'>
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
      </div> */}
      {/* {refIsChecked
        ? addRefInput.map((item, index) => (
            <div key={index}>
              <input
                name='references'
                id='references'
                value={item.references}
                onChange={(e) => handleRefTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder='Ref:    (a) COMSUBGRU TWO ltr 7200 Ser N1/123 of 12 Mar 08 '
              /> */}

      {/* Add button appears on last input field added */}
      {/* {addRefInput.length - 1 === index && addRefInput.length < 50 && (
                <button
                  type='button'
                  className='btn mr-4 mb-3 btn-sm sm:btn'
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
        : null} */}
      {/****--------------3nd RADIO BUTTON AND FIELDS-----------------****/}
      {/* <div className='form-control block items-center text-xs my-1 sm:text-lg'>
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
      </div> */}
      {/* {encIsChecked
        ? addEncInput.map((item, index) => (
            <div key={index}>
              <input
                name='enclosures'
                id='enclosures'
                value={item.enclosures}
                onChange={(e) => handleEncTextInput(e, index)}
                type='text'
                className='block w-full text-black text-[8px] my-3 rounded-md py-2 pl-1 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-base sm:pl-9 sm:pr-3'
                placeholder={`(${index+1}) List of Reserve Officers Selected for Promotion to Colonel`}
              /> */}

      {/* Add button appears on last input field added */}
      {/* {addEncInput.length - 1 === index && addEncInput.length < 50 && (
                <button
                  type='button'
                  className='btn mr-4 mb-3 btn-sm sm:btn'
                  onClick={addEncInputTag}>
                  Add Encl
                </button>
              )}

              {addEncInput.length > 1 && (
                <button
                  type='button'
                  className='btn btn-sm sm:btn'
                  onClick={(e) => removeEncInputTag(e, index)}>
                  Remove Encl
                </button>
              )}
            </div>
          ))
        : null} */}
    </Fragment>
  );
};

export default Radios;

//*https://www.youtube.com/watch?v=XtS14dXwvwE
