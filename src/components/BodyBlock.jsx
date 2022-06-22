import { Fragment, useState } from 'react';
// This will need be part of an editor with live preview

const BodyBlock = () => {
  const [isParagraph, setIsParagraph] = useState(false);
  const [isSubA, setIsSubA] = useState(false);
  const [isSubB, setIsSubB] = useState(false);
  const [isSubC, setIsSubC] = useState(false);
  const [paragraphs, setParagraphs] = useState([
    {
      pId: 1,
      paragraph: ''
      // subA: '',
      // subB: '',
      // subC: '',
    }
  ]);
  console.log('paragraphs', paragraphs);

  // TODO THIS WORKS
  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = () => {
    let arr = [...paragraphs];
    const idIncrement = arr.map((item) => item.pId + 1).pop();
    setParagraphs((prev) => [
      ...prev,
      // *!{ pId: idIncrement, paragraph: '', sub: '' }
      { pId: idIncrement, paragraph: '' }
    ]);
  };

  // TODO THIS WORKS
  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = (id) => {
    console.log('clicked to Add subABC');
    let arr = [...paragraphs];

    const addSubPArr = arr.map((item) => {
      return item.pId === id && item.subA === null
        ? { ...item, subA: '' }
        : !item.subB && item.subA && item.pId === id
        ? { ...item, subB: '' }
        : !item.subC && item.subA && item.subB && item.pId === id
        ? { ...item, subC: '' }
        : item;
    });
    setParagraphs(addSubPArr);
  };

  // TODO WORKS
  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = [...paragraphs];
    const newList = paragraphArr.filter((item) => item.pId !== id);
    if (paragraphArr.length > 1 && paragraphArr.length < 10) {
      setParagraphs(newList);
    }
  };

  // TODO WORKS
  // *HANDLE REMOVING SUBPARAGRAPH BY ID AND MAPPED VALUES FROM STATE TO UI
  const removeSubParagraph = (sub, id) => {
    let paragraphArr = [...paragraphs];

    const newList = () => {
      return paragraphArr.map((item) => {
        if (item.pId === id && item.subA === sub) {
          const { subA, ...rest } = item;
          return { ...rest };
        }
        if (item.pId === id && item.subB === sub) {
          const { pId, paragraph, subA } = item;
          return { pId, paragraph, subA };
        }
        if (item.pId === id && item.subC === sub) {
          const { pId, paragraph, subA, subB } = item;
          return { pId, paragraph, subA, subB };
        }
        return item;
      });
    };
    setParagraphs(newList);
  };

  // TODO WORKS
  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, index) => {
    let paragraphText = [...paragraphs];
    const { name, value } = e.target;
    if (name === 'paragraph') {
      paragraphText[index][name] = value;
      setParagraphs(paragraphText);
    }
  };
  
  // TODO WORKS
  // TODO NEED TO CHANGE THIS INDEX TO THE pId
  const subParagraphOnChange = (e, index) => {
    let subParagraphText = [...paragraphs];
    const { name, value } = e.target;
    subParagraphText[index][name] = value;
    console.log('onchangeID', index);
    setParagraphs(subParagraphText);
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      {paragraphs.map((item, index) => (
        <div key={index}>
          <label className=' block mb-2 text-xs t sm:text-base '>{`Paragraph #${item.pId}`}</label>
          <textarea
            name='paragraph'
            id='paragraph'
            rows='20'
            spellCheck='true'
            type='text'
            value={item.paragraph}
            onChange={(e) => bodyBlockOnChange(e, index)}
            className=' block h-full py-4 text-xs from-control input input-bordered input-info w-full sm:text-lg '
            placeholder={`Start writing the body paragraph for #${item.pId}`}
          />
          {/*--------------ADD AND DELETE BUTTON FOR PARAGRAPH-------------*/}
          <div
            className='btn-group my-3 flex flex-row justify-between'
            key={index}>
            {paragraphs.length - 1 === index && paragraphs.length < 10 && (
              <button
                className='btn btn-xs btn-neutral-content sm:btn'
                onClick={addParagraph}>
                Add A Para.
              </button>
            )}
            {paragraphs.length > 1 && paragraphs.length < 10 && (
              <button
                className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                onClick={() => {
                  removeParagraph(item.pId);
                  setIsParagraph(true);
                }}>
                Delete
              </button>
            )}
          </div>

          {/* ADD THE SUBPARAGRAPH TO IF THE BUTTON IS CLICKED, DELETE BUTTONM NOT SHOWN UNLESS ADD IS CLICKED */}
          {/* --------------1st SUB PARA-------------------- */}

          {isSubA ? (
            <div>
              <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph "a"`}</label>
              <textarea
                name='subA'
                id='subA'
                rows='10'
                spellCheck='true'
                type='text'
                value={item.subA}
                onChange={(e) => subParagraphOnChange(e, index)}
                className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                placeholder={`Sub paragraph "a"`}
              />

              <div className='btn-group my-3 flex flex-row justify-between'>
                <button
                  className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                  // disabled={item.subA ===null ? 'disabled' : ''}
                  onClick={() => {
                    removeSubParagraph(item.subA, item.pId);
                    setIsSubA(false);
                  }}>
                  Delete A
                </button>
              </div>
            </div>
          ) : (
            <button
              className='btn btn-xs btn-neutral-content sm:btn'
              // disabled={item.paragraph.length === 0 ? 'disabled' : ''}
              onClick={() => {
                addSubP(item.pId);
                setIsSubA(true);
              }}>
              Add A Sub A Para.
            </button>
          )}

          {/* -------------------------2nd SUB PARA------------------*/}
          {isSubB ? (
            <div>
              <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph "b"`}</label>
              <textarea
                name='subB'
                id='subB'
                rows='10'
                spellCheck='true'
                type='text'
                value={item.subB}
                onChange={(e) => subParagraphOnChange(e, index)}
                className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                placeholder={`Sub paragraph "b"`}
              />
              <div className='btn-group my-3 flex flex-row justify-between'>
                <button
                  className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                  disabled={isSubC ? 'disabled' : ''}
                  onClick={() => {
                    removeSubParagraph(item.subB, item.pId);
                    setIsSubB(false);
                  }}>
                  Delete B
                </button>
              </div>
            </div>
          ) : (
            isSubA === true &&
            isSubB === false && (
              <button
                className='btn btn-xs btn-neutral-content sm:btn'
                // disabled={item.subA.length===0 ? 'disabled' : ''
                onClick={() => {
                  addSubP(item.pId);
                  setIsSubB(true);
                }}>
                Add A Sub B Para.
              </button>
            )
          )}
          {/*--------------------3rd SUB PARA--------------------*/}
          {isSubC ? (
            <div>
              <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph "c"`}</label>
              <textarea
                name='subC'
                id='subC'
                rows='10'
                spellCheck='true'
                type='text'
                value={item.subC}
                onChange={(e) => subParagraphOnChange(e, index)}
                className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                placeholder={`Sub paragraph "c"`}
              />

              <div className='btn-group my-3 flex flex-row justify-between'>
                <button
                  className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                  onClick={() => {
                    removeSubParagraph(item.subC, item.pId);
                    setIsSubC(false);
                  }}>
                  Delete C
                </button>
              </div>
            </div>
          ) : (
            isSubA === true &&
            isSubB === true &&
            isSubC === false && (
              <button
                className='btn btn-xs btn-neutral-content sm:btn'
                // disabled={item.subA.length===0 ? 'disabled' : ''}

                onClick={() => {
                  addSubP(item.pId);
                  setIsSubC(true);
                }}>
                Add A Sub C Para.
              </button>
            )
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default BodyBlock;
