import { Fragment, useState } from 'react';
// This will need to be part of an editor with live preview

const BodyBlock = ({data, setData}) => {

 const {paragraphs}=data;


  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = (id) => {
    
    let arr = data.paragraphs;

    if (arr.length > 0 && arr.length < 10) {
      setData((prev) => ({
        ...prev,
        paragraphs: [...prev.paragraphs,{pId: id+1, paragraph: '', subParagraph: [] }
        ]}));
    }
  };


  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = (id) => {
    let arr = data.paragraphs
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

    setData(prev=> ({...prev,paragraphs:addSubPArr}));
  };

  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = data.paragraphs
    const paragraphItemRemoved = paragraphArr.filter((item) => item.pId !== id);
    if (paragraphArr.length > 0 && paragraphArr.length <= 10) {
      setData(prev=> ({...prev,paragraphs:paragraphItemRemoved}));
    }
    if (paragraphArr.length === 1) {
      setData(prev=> ({...prev,paragraphs:[{ pId: 1, paragraph: '', subParagraph: [] }]}));
  };
  }
  // *HANDLE REMOVING SUBPARAGRAPH BY ID AND MAPPED VALUES FROM STATE TO UI
  const removeSubParagraph = (subItem, id) => {
    let paragraphArr = data.paragraphs;

    const subParagraphItemRemoved = () => {
      return paragraphArr.map((item) => {
        const { pId, paragraph, subParagraph } = item;

        return pId === id && subParagraph.length === 1
          ? { pId, paragraph, subParagraph: [] }
          : pId === id && subParagraph.length === 2
          ? { pId, paragraph, subParagraph: [subParagraph[0]] }
          : pId === id && subParagraph.length === 3
          ? { pId, paragraph, subParagraph: [subParagraph[0], subParagraph[1]] }
          : item;
      });
    };
    setData(prev=> ({...prev,paragraphs:subParagraphItemRemoved}));
    // !STOPPEED JUST NEED SUB PARAGRPAH TO GET REMOVED
  };

  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, itemPid, index) => {
    let paragraphText = data.paragraphs
    const { name, value } = e.target;
    // ex:[{name:'a'},{name:'b'},{name:'c'},{name:'d'}][2][name]='c'
    paragraphText[index][name] = value;

    setData(prev=> ({...prev, paragraphs:paragraphText}));
  };

  const subParagraphOnChange = (e, index, idx) => {
    let subTextArr = data.paragraphs
    const { name, value } = e.target;
    subTextArr[index].subParagraph[idx][name] = value;

    // ex: {pId,paragraph, subParagraph}.subParagraph[0][name]
    setData(prev=> ({...prev,paragraphs:subTextArr}));
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      {paragraphs.map((itemParagraph, index) => {
        return (
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
            {/*--------------ADD AND DELETE BUTTON FOR PARAGRAPH-------------*/}
            <div
              className='btn-group my-3 flex flex-row justify-between'
              // key={itemParagraph.pId}
              >
              <button
              type='button'
                className='btn btn-xs my-2 btn-neutral-content sm:btn'
                onClick={()=> addParagraph(itemParagraph.pId)}>
                Add Para.
              </button>
              <button
              type='button'
                className='btn btn-xs my-2 bg-error-content sm:btn sm:bg-error-content'
                onClick={() => {
                  removeParagraph(itemParagraph.pId);
                }}>
                Delete Para.
              </button>
            </div>
            {/* --------------1st SUB PARA-------------------- */}
            <div>
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
                  {/* Sub Paragraph Buttons----------------------- */}
                  <div className='btn-group my-3 flex flex-row justify-between'>
                    <button
              type='button'

                      className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                      disabled={
                        itemParagraph.subParagraph.length - 2 === idx ||
                        itemParagraph.subParagraph.length - 3 === idx
                          ? 'disabled'
                          : ''
                      }
                      onClick={() => {
                        removeSubParagraph(subItem, itemParagraph.pId);
                      }}>
                      Delete sub
                    </button>
                  </div>
                </div>
              ))}
              <button
              type='button'
                className='btn btn-xs btn-neutral-content sm:btn'
                disabled={
                  itemParagraph.paragraph.length === 0 || itemParagraph.subParagraph.length === 3
                    ? 'disabled'
                    : ''
                }
                onClick={() => {
                  addSubP(itemParagraph.pId);
                }}>
                Add sub
              </button>
            </div>
          </div>
         );
      })}
    </Fragment>
  );
};

export default BodyBlock;
