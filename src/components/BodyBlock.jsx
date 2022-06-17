import { Fragment, useState } from 'react';
// This will need be part of an editor with live preview
const BodyBlock = () => {
  const [isParagraph, setIsParagraph] = useState(false);
  const [paragraphs, setParagraphs] = useState([
    {
      pId: 1,
      paragraph: '',
      subP: ''
    }
  ]);
  // * Destructure
  const [{ pId, paragraph, subP }] = paragraphs;
  console.log('pid', pId);

  // *HANDLE ADDING A PARAGRAPH
  const addParagraph = () => {
    setIsParagraph(false);
    console.log('cliked for add paragraph');
    let arr = [...paragraphs];
    const idIncrement = arr.map((item) => item.pId + 1).pop();
    setParagraphs((prev) => [
      ...prev,
      { pId: idIncrement, paragraph: '', subP: '' }
    ]);
  };
  // *HANDLE ADDING A SUBPARAGRAPH
  const addSubP = () => {
    console.log('click SUBP');

    // setParagraphs((prev) => [
    //   ...prev,
    //   {  subP: '' }
    // ]);
  };

  // *HANDLE REMOVING PARAGRAPH
  // *HANDLE REMOVING SUBPARAGRAPH

  // *HANDLE ONCHANGE TEXT INPUTS
  const bodyBlockOnChange = (e, index) => {
    let paragraphText = [...paragraphs];
    const { name, value } = e.target;
    // paragraphs
    console.log(index);
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);
    console.log('paragraphs', paragraphs);
    console.log('paragraph', paragraph);

    if (name === 'paragraph') {
      paragraphText[index][name] = value;
      setParagraphs(paragraphText);
    }

    if (name === 'subP') {
      let subParaText = [...paragraphs];
      subParaText[index][name] = value;
      setParagraphs(subParaText);
    }
    console.log('paragraph lengh', paragraph.length);
  };
  console.log('paragra lengh', paragraph.length);

  // if (paragraph.length>0) {
  //   setIsParagraph(true);
  // } else {
  //   setIsParagraph(false);
  // }

  console.log('isParagraph', isParagraph);
  console.log('paragraph OUTSIDE OF ONCHANGE', paragraphs);

  const subPOnChange = (e, index) => {
    let selectOptions = [...paragraphs];
    const { name, value } = e.target;

    console.log('value', value);
    console.log('name', name);
    console.log('selectOptions', selectOptions);

    // selectOptions[index][value]=value
    // setParagraphs(({selectOptions}))
  };
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      {paragraphs
        ? paragraphs.map((item, index) => (
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
                <button className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'>
                  Delete
                </button>
              </div>

              {/* ADD THE SUBPARAGRAPH TO IF THE BUTTON IS CLICKED, DELETE BUTTONM NOT SHOWN UNLESS ADD IS CLICKED*/}
              <div>
                <label className=' block mb-2 text-xs t sm:text-base '>{`Sub Paragraph #${item.pId}`}</label>
                <textarea
                  name='subP'
                  id='subP'
                  rows='10'
                  spellCheck='true'
                  type='text'
                  disabled={item.paragraph.length > 0 ? '' : 'disabled'}

                  value={item.subP}
                  onChange={(e) => bodyBlockOnChange(e, index)}
                  className=' block h-full text-xs pt-4 from-control input input-bordered input-info w-full sm:text-lg '
                  placeholder={`Start writing in the above paragraph #${item.pId} to access this sub paragraph `}
                />
                {/* ADD AND DELETE BUTTON FOR SUBP */}
                <div className='btn-group my-3 flex flex-row justify-between'>
                  <div
                    className='tooltip'
                    data-tip={
                      item.paragraph.length < 1
                        ? 'Write a paragraph 1st'
                        : 'Add more'
                    }>
                    <button
                      className='btn btn-xs btn-neutral-content sm:btn'
                      disabled={item.paragraph.length > 0 ? '' : 'disabled'}
                      onClick={addSubP}>
                      Add A Sub Para.
                    </button>
                  </div>

                  <button
                    className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'
                    disabled={item.paragraph.length > 0 ? '' : 'disabled'}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}
    </Fragment>
  );
};

export default BodyBlock;
