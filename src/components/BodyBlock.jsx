import { Fragment, useState } from 'react';
// This will need be part of an editor with live preview

const BodyBlock = () => {
  const [isParagraph, setIsParagraph] = useState(false);
  const [isSubA, setIsSubA] = useState(false);
  const [isSubB, setIsSubB] = useState(false);
  const [isSubC, setIsSubC] = useState(false);
  const [isSub, setIsSub] = useState(null);
  const [paragraphs, setParagraphs] = useState([
    {
      pId: 1,
      paragraph: '',
      subParagraph: []
    }
  ]);
  console.log('paragraphs', paragraphs);

  // *WORKS
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

  // *WORKS
  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = ( id) => {
    console.log('clicked to Add subABC');
    let arr = [...paragraphs];
    console.log('id in add sub', id);
    const addSubPArr = arr.map((item) => {
      const { pId, subParagraph } = item;
      return pId === id && subParagraph.length === 0
        ? { ...item, subParagraph: [{ name: 'test1', text: 'text test1' }] }
        : pId === id && subParagraph.length === 1
        ? {
            ...item,
            subParagraph: [
              subParagraph[0],
              { name: 'test2', text: 'text test2' }
            ]
          }
        : item.pId === id && subParagraph.length === 2
        ? {
            ...item,
            subParagraph: [
              subParagraph[0],
              subParagraph[1],
              { name: 'test3', text: 'text test3' }
            ]
          }
        : item;
    });

    setParagraphs(addSubPArr);
  };
  // *WORKS
  // *HANDLE REMOVING PARAGRAPH
  const removeParagraph = (id) => {
    let paragraphArr = [...paragraphs];
    const newList = paragraphArr.filter((item) => item.pId !== id);
    if (paragraphArr.length > 0 && paragraphArr.length <= 10) {
      setParagraphs(newList);
    }
    if (paragraphArr.length === 1) {
      setParagraphs(paragraphs);
    }
  };
  // *WORKS
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
        // if (pId === id && subParagraph.length === 1) {
        //   return { pId, paragraph, subParagraph: [] };
        // }
        // if (pId === id && subParagraph.length === 2) {
        //   return { pId, paragraph, subParagraph: [subParagraph[0]] };
        // }
        // if (pId === id && subParagraph.length === 3) {
        //   return {
        //     pId,
        //     paragraph,
        //     subParagraph: [subParagraph[0], subParagraph[1]]
        //   };
        // }
        // return item;
      });
    };
    setParagraphs(newList);
  };

  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, itemPid, index) => {
    let paragraphText = [...paragraphs];
    const { name, value, id } = e.target;
    // console.log('name', name);
    // console.log('value', value);
    // console.log('id', id);
    // console.log('itemPid', itemPid);

    // ex:[{name:'a'},{name:'b'},{name:'c'},{name:'d'}][2][name]='c'
    paragraphText[index][name] = value;

    setParagraphs(paragraphText);
  };

  // ?? NEEDS WORK
  // TODO NEED TO CHANGE THIS INDEX TO THE pId
  const subParagraphOnChange = (e, itemPid, index) => {
    let subTextArr = [...paragraphs];
    const { name, value, id } = e.target;
    console.log('name', name);
    console.log('value', value);
    console.log('e.target,id,subOnchange', id);
    console.log('id', id);
    console.log('itemPid', itemPid);

    if (itemPid === subTextArr.pId) {
      const addSubText = subTextArr.map((item) => {
        // check id matches
        console.log('hello', item.subParagraph[0].text);
        // item.subParagraph[0].text=value
        item.subParagraph.map((subItem, idx) =>
          idx ? (subItem.text = value) : subItem
        );

        return setParagraphs(subTextArr);
        return item;
      });
    }
    // console.log("addSubText",addSubText);
    console.log(' subParagraphText[index][name] = value;', subTextArr[index]);
    // subParagraphText[index][name][0].text = value;
    // setParagraphs(subParagraphText);
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
              onChange={(e) => bodyBlockOnChange(e, item.pId, index)}
              className=' block h-full py-4 text-xs from-control input input-bordered input-info w-full sm:text-lg '
              placeholder={`Start writing the body paragraph for ID #${item.pId}`}
            />
            {/*--------------ADD AND DELETE BUTTON FOR PARAGRAPH-------------*/}
            <div
              className='btn-group my-3 flex flex-row justify-between'
              key={item.pId}>
              {/* {paragraphs.indexOf(item.pId) === paragraphs.length - 1 &&
              paragraphs.length < 10 && ( */}
              <button
                className='btn btn-xs btn-neutral-content sm:btn'
                onClick={addParagraph}>
                Add A Para.
              </button>
              {/* {paragraphs.length >= 0 && paragraphs.length < 11 && ( */}
              <button
                className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                onClick={() => {
                  removeParagraph(item.pId);
                  setIsParagraph(true);
                }}>
                Delete A Paragraph
              </button>
            </div>
            {/* --------------1st SUB PARA-------------------- */}
            {/* STOPPED HERE WORKING ON THE INNER LOOP, THE ADD FUNCTION WORKS, NEED TO CHECK ONCHANGE AND DELETE */}
            <div>
              {item.subParagraph!==null && item.subParagraph.map((subItem, idx) => (
                <div key={idx}>
                  <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph "a"`}</label>
                  <textarea
                    name='text'
                    id='text'
                    rows='10'
                    spellCheck='true'
                    type='text'
                    // showsub={item.pId}
                    value={subItem.text}
                    onChange={(e) => subParagraphOnChange(e, item.pId, idx)}
                    className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                    placeholder={`Sub paragraph "a"`}
                  />
                  {/* Buttons----------------------- */}
                  <div className='btn-group my-3 flex flex-row justify-between'>
                    <button
                      className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                      // disabled={isSubB && isSub === item.pId ? 'disabled' : ''}
                      onClick={() => {
                        removeSubParagraph(subItem, item.pId);
                        // setIsSubA(false);
                      }}>
                      Delete a sub
                    </button>
                
                  </div>
                </div>
              ))}
                <button
                      className='btn btn-xs btn-neutral-content sm:btn'
                      // disabled={item.paragraph.length === 0 ? 'disabled' : ''}
                      onClick={() => {
                        addSubP( item.pId);
                        // setIsSub(item.pId);
                        // setIsSubA(true);
                      }}>
                      Add a sub
                    </button>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default BodyBlock;
