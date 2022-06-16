import { Fragment, useState } from 'react';
// This will need be part of an editor with live preview
const BodyBlock = () => {
  const [bodyBlockText, setBodyBlocktext] = useState('');

  const bodyBlockOnChange = (e) => {
    // let paragraphs = [...bodyBlockText]
    // const value = e.target.value
    // const name = e.target.name
    // paragraphs
console.log("bodyBlockText",bodyBlockText);
setBodyBlocktext({ [e.target.name]: e.target.value })
}


  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      <textarea
        name='paragraph'
        id='paragraph'
        // rows='15'
        rows='20'
        spellCheck='true'
        type='text'
        onChange={bodyBlockOnChange}
        className=' block h-full text-xs from-control input input-bordered input-info w-full sm:text-lg '
        placeholder='Enter a body paragraph:'
      />
      <div className='btn-group flex flex-row justify-between'>
        <button className='btn btn-xs btn-neutral-content sm:btn'>Add</button>

        <div
          className='tooltip'
          data-tip='Add a subparagraph to your last paragraph'>
          <label className='text-sm mr-3 sm:text-lg'>Sub </label>
          <select className='select select-xs select-info sm:select-md md:text-lg'>
            <option value='select'>select</option>
            <option>a</option>
            <option>b</option>
            <option>c</option>
            <option>d</option>
          </select>
        </div>
        <button className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'>
          Delete
        </button>
      </div>
    </Fragment>
  );
};

export default BodyBlock;
