import { Fragment, useState } from 'react';
// This will need to be part of an editor with live preview

const BodyBlock = ({ data, setData }) => {
  const { paragraphs } = data;

  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = (id) => {
    let arr = data.paragraphs;

    if (arr.length > 0 && arr.length < 10) {
      setData((prev) => ({
        ...prev,
        paragraphs: [
          ...prev.paragraphs,
          { pId: id + 1, paragraph: '', subParagraph: [] }
        ]
      }));
    }
  };

  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = (id) => {
    let arr = data.paragraphs;
    const addSubPArr = arr.map((item) => {
      const { pId, subParagraph } = item;
      return pId === id && subParagraph.length === 0
        ? { ...item, subParagraph: [{ name: 'subA', text: '' }] }
        : pId === id && subParagraph.length === 1
        ? {
            ...item,
            subParagraph: [subParagraph[0], { name: 'subB', text: '' }]
          }
        : item.pId === id && subParagraph.length === 2
        ? {
            ...item,
            subParagraph: [
              subParagraph[0],
              subParagraph[1],
              { name: 'subC', text: '' }
            ]
          }
        : item;
    });

    setData((prev) => ({ ...prev, paragraphs: addSubPArr }));
  };

  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = data.paragraphs;
    const paragraphItemRemoved = paragraphArr.filter((item) => item.pId !== id);
    if (paragraphArr.length > 0 && paragraphArr.length <= 10) {
      setData((prev) => ({ ...prev, paragraphs: paragraphItemRemoved }));
    }
    if (paragraphArr.length === 1) {
      setData((prev) => ({
        ...prev,
        paragraphs: [{ pId: 1, paragraph: '', subParagraph: [] }]
      }));
    }
  };
  // *HANDLE REMOVING SUBPARAGRAPH BY ID AND MAPPED VALUES FROM STATE TO UI
  const removeSubParagraph = (subName) => {
    let paragraphArr = data.paragraphs;

    // const subParagraphItemRemoved = () => {
    //   return paragraphArr.map((item) => {
    //     const { pId, paragraph, subParagraph } = item;

    //     return pId === id && subParagraph.length === 1
    //       ? { pId, paragraph, subParagraph: [] }
    //       : pId === id && subParagraph.length === 2
    //       ? { pId, paragraph, subParagraph: [subParagraph[0]] }
    //       : pId === id && subParagraph.length === 3
    //       ? { pId, paragraph, subParagraph: [subParagraph[0], subParagraph[1]] }
    //       : item;
    //   });
    // };
    // Must map twice for nested subparapgraph
    const removeSubParagraph = paragraphArr.map((paraItem) =>
      paraItem.subParagraph.filter((subPara) => subPara.name === subName)
    );
    console.log('REMOVESUBPARAGRAPH', removeSubParagraph);
    // setData(prev=> ({...prev,paragraphs.subParagraphs,subParagraphs: subParagraphItemRemoved}));
    // !STOPPEED JUST NEED SUB PARAGRPAH TO GET REMOVED
// !LOG THIS TO CHECK THE FILTER
  };

  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, itemPid, index) => {
    let paragraphText = data.paragraphs;
    const { name, value } = e.target;
    // ex:[{name:'a'},{name:'b'},{name:'c'},{name:'d'}][2][name]='c'
    paragraphText[index][name] = value;

    setData((prev) => ({ ...prev, paragraphs: paragraphText }));
  };

  const subParagraphOnChange = (e, index, idx) => {
    let subTextArr = data.paragraphs;
    const { name, value } = e.target;
    subTextArr[index].subParagraph[idx][name] = value;

    // ex: {pId,paragraph, subParagraph}.subParagraph[0][name]
    setData((prev) => ({ ...prev, paragraphs: subTextArr }));
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>

      {paragraphs.map((itemParagraph, index) => (
        // PARAGRAPHS
        <div key={itemParagraph.pId}>
          <label className=' block mb-2 text-xs t sm:text-base '>{`Paragraph ID #${itemParagraph.pId}`}</label>
          <textarea
            name='paragraph'
            id='paragraph'
            rows='20'
            spellCheck='true'
            type='text'
            value={itemParagraph.paragraph}
            // required
            onChange={(e) => bodyBlockOnChange(e, itemParagraph.pId, index)}
            className=' block h-full py-4 text-xs from-control input input-bordered input-info w-full sm:text-lg '
            placeholder={`Start writing the body paragraph for ID #${itemParagraph.pId}`}
          />

          {/* SUBPARAGRAPHS*/}
          {itemParagraph.subParagraph.map((subItem, idx) => (
            <div key={idx}>
              <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph ${
                idx === 0 ? 'a' : idx === 1 ? 'b' : 'c'
              }`}</label>
              <textarea
                name='text'
                id='text'
                rows='10'
                spellCheck='true'
                type='text'
                value={subItem.text}
                onChange={(e) => subParagraphOnChange(e, index, idx)}
                className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                placeholder={`Write your sub paragraph ${
                  idx === 0 ? 'a' : idx === 1 ? 'b' : 'c'
                }`}
              />
            </div>
          ))}

          <div className='btn-group'>
            <button
              type='button'
              className='btn btn-xs my-2 btn-neutral-content sm:btn'
              onClick={() => addParagraph(itemParagraph.pId)}
              disabled={
                itemParagraph.paragraph.length === 0 ||
                paragraphs.length - 1 > index
                  ? 'disabled'
                  : ''
              }>
              Add Para
            </button>
            <button
              type='button'
              className='btn btn-xs my-2 bg-error-content sm:btn sm:bg-error-content'
              disabled={itemParagraph.paragraph.length === 0 ? 'disabled' : ''}
              onClick={() => {
                removeParagraph(itemParagraph.pId);
              }}>
              Delete Para
            </button>
          </div>

          <button
            type='button'
            className='btn btn-xs btn-neutral-content sm:btn'
            disabled={
              itemParagraph.paragraph.length === 0 ||
              itemParagraph.subParagraph.length === 3
                ? 'disabled'
                : ''
            }
            onClick={() => {
              addSubP(itemParagraph.pId);
            }}>
            Add sub
          </button>
          <button
            type='button'
            className='btn btn-xs my-2 bg-error-content sm:btn sm:bg-error-content'
            disabled={itemParagraph.paragraph.length === 0 ? 'disabled' : ''}
            //!LOST ACCESS TO THE SUBITEM PARAMTER FOR THE ONCLICK DUE TO LOCATION OF BUTTON AND 2ND MAP OF SUBPARAGRAPHS
            onClick={() => {
              // removeSubParagraph(subItem, itemParagraph.pId);
              removeSubParagraph(itemParagraph.paragraphs.name);
            }}>
            Delete sub
          </button>
        </div>
      ))}
    </Fragment>
  );
};

export default BodyBlock;
