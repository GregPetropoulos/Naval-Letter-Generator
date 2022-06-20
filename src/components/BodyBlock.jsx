import { Fragment, useState } from 'react';
// This will need be part of an editor with live preview

const BodyBlock = () => {
  const [isParagraph, setIsParagraph] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [paragraphs, setParagraphs] = useState([
    {
      pId: 1,
      paragraph: ''
      // sub: ''
    }
  ]);

  // TODO THIS WORKS
  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = () => {
    setIsParagraph(false);
    // console.log('cliked for add paragraph');
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
    setIsSub(true);
    console.log('click ADD SUB');
    let arr = [...paragraphs];

    // Map through find correct id and add in a sub paragraph to item object in the array 
    const addSubPArr = arr.map((item) =>
      item.pId === id && item.subA === undefined
        ? { ...item, subA: '' }
        : item.pId === id && item.subB === undefined
        ? { ...item, subB: '' }
        : item.pId === id && item.subC === undefined
        ? { ...item, subC: '' }
        : item
    );
    console.log('addSubPArr', addSubPArr);
    setParagraphs(addSubPArr);
  };

  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = [...paragraphs];
    const newList = paragraphArr.filter((item) => item.pId !== id);
    setParagraphs(newList);
  };

  console.log('paragraphs', paragraphs);
  // TODO
  // *HANDLE REMOVING SUBPARAGRAPH
  const removeSubParagraph = (sub) => {
    setIsSub(false);
    let paragraphArr = [...paragraphs];
    // console.log("id",id)
    console.log('sub', sub);
    // const newList = paragraphArr.filter((item) => item.pId !== id);
    // const newList = paragraphArr.filter((item) => item.sub !== sub);
    // setParagraphs(newList);
  };
  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, index) => {
    let paragraphText = [...paragraphs];
    const { name, value } = e.target;

    if (name === 'paragraph') {
      paragraphText[index][name] = value;
      setParagraphs(paragraphText);
    }

    // if (name === 'sub') {
    //   let subParaText = [...paragraphs];
    //   subParaText[index][name] = value;
    //   setParagraphs(subParaText);
    // }
  };

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
            // rows='15'
            rows='20'
            spellCheck='true'
            type='text'
            value={item.paragraph}
            onChange={(e) => bodyBlockOnChange(e, index)}
            className=' block h-full py-4 text-xs from-control input input-bordered input-info w-full sm:text-lg '
            placeholder={`Start writing the body paragraph for #${item.pId}`}
          />
          {/* ADD AND DELETE BUTTON FOR PARAGRAPH */}
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
            <button
              className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
              onClick={() => removeParagraph(item.pId)}>
              Delete
            </button>
          </div>

          {/* ADD THE SUBPARAGRAPH TO IF THE BUTTON IS CLICKED, DELETE BUTTONM NOT SHOWN UNLESS ADD IS CLICKED */}
          {/**-------------- */}
          {item.subA ? (
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
                  className='btn btn-xs btn-neutral-content sm:btn'
                  // disabled={item.paragraph.length > 0 ? '' : 'disabled'}
                  onClick={() => addSubP(item.pId)}>
                  Add A Sub Para.
                </button>

                <button
                  className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                  // disabled={item.paragraph.length > 0 ? '' : 'disabled'}
                  onClick={() => removeSubParagraph(item.subA)}>
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <button
              className='btn btn-xs btn-neutral-content sm:btn'
              // disabled={item.paragraph.length > 0 ? '' : 'disabled'}
              onClick={() => addSubP(item.pId)}>
              Add A Sub Para.
            </button>
          )}

          {/* ) : (
            <button
              className='btn btn-xs btn-neutral-content sm:btn'
              // disabled={item.paragraph.length > 0 ? '' : 'disabled'}
              onClick={()=> addSubP(item.pId)}>
              Add A Sub Para.
            </button>
          )} */}
        </div>
      ))}
    </Fragment>
  );
};

export default BodyBlock;
