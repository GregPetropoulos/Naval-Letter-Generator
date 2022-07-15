import { Fragment, useState } from 'react';
// This will need to be part of an editor with live preview

const BodyBlock = () => {

  const [paragraphs, setParagraphs] = useState([
    {
      pId: 1,
      paragraph: '',
      subParagraph: []
    }
  ]);


  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = () => {
    let arr = [...paragraphs];
    const idIncrement = arr.map((item) => item.pId + 1).pop();
    if (arr.length > 0 && arr.length < 10) {
      setParagraphs((prev) => [
        ...prev,
        { pId: idIncrement, paragraph: '', subParagraph: [] }
      ]);
    }
  };


  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = (id) => {
    let arr = [...paragraphs];
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

    setParagraphs(addSubPArr);
  };

  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = [...paragraphs];
    const newList = paragraphArr.filter((item) => item.pId !== id);
    if (paragraphArr.length > 0 && paragraphArr.length <= 10) {
      setParagraphs(newList);
    }
    if (paragraphArr.length === 1) {
      setParagraphs([{ pId: 1, paragraph: '', subParagraph: [] }]);
    }
  };

  // *HANDLE REMOVING SUBPARAGRAPH BY ID AND MAPPED VALUES FROM STATE TO UI
  const removeSubParagraph = (subItem, id) => {
    let paragraphArr = [...paragraphs];

    const newList = () => {
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
    setParagraphs(newList);
  };

  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, itemPid, index) => {
    let paragraphText = [...paragraphs];
    const { name, value } = e.target;
    // ex:[{name:'a'},{name:'b'},{name:'c'},{name:'d'}][2][name]='c'
    paragraphText[index][name] = value;

    setParagraphs(paragraphText);
  };

  const subParagraphOnChange = (e, index, idx) => {
    let subTextArr = [...paragraphs];
    const { name, value } = e.target;
    subTextArr[index].subParagraph[idx][name] = value;

    // ex: {pId,paragraph, subParagraph}.subParagraph[0][name]
    setParagraphs(subTextArr);
  };

  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      {paragraphs.map((item, index) => {
        return (
          <div key={item.pId}>
            <label className=' block mb-2 text-xs t sm:text-base '>{`Paragraph ID #${item.pId}`}</label>
            <textarea
              name='paragraph'
              id='paragraph'
              rows='20'
              spellCheck='true'
              type='text'
              value={item.paragraph}
              required
              onChange={(e) => bodyBlockOnChange(e, item.pId, index)}
              className=' block h-full py-4 text-xs from-control input input-bordered input-info w-full sm:text-lg '
              placeholder={`Start writing the body paragraph for ID #${item.pId}`}
            />
            {/*--------------ADD AND DELETE BUTTON FOR PARAGRAPH-------------*/}
            <div
              className='btn-group my-3 flex flex-row justify-between'
              key={item.pId}>
              <button
                className='btn btn-xs my-2 btn-neutral-content sm:btn'
                onClick={addParagraph}>
                Add Para.
              </button>
              <button
                className='btn btn-xs my-2 bg-error-content sm:btn sm:bg-error-content'
                onClick={() => {
                  removeParagraph(item.pId);
                }}>
                Delete Para.
              </button>
            </div>
            {/* --------------1st SUB PARA-------------------- */}
            <div>
              {item.subParagraph.map((subItem, idx) => (
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
                      className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                      disabled={
                        item.subParagraph.length - 2 === idx ||
                        item.subParagraph.length - 3 === idx
                          ? 'disabled'
                          : ''
                      }
                      onClick={() => {
                        removeSubParagraph(subItem, item.pId);
                      }}>
                      Delete sub
                    </button>
                  </div>
                </div>
              ))}
              <button
                className='btn btn-xs btn-neutral-content sm:btn'
                disabled={
                  item.paragraph.length === 0 || item.subParagraph.length === 3
                    ? 'disabled'
                    : ''
                }
                onClick={() => {
                  addSubP(item.pId);
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
