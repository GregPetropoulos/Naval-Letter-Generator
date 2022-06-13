import { Fragment } from 'react';
// This will need be part of an editor with live preview
const BodyBlock = () => {
  return (
    <Fragment>
      <label className='sm:text-xl mt-7'> Body Block</label>
      <textarea
        name='text1'
        // rows='15'
        rows='20'
        spellCheck='true'
        type='text'
        className=' block h-full text-xs from-control input input-bordered input-info w-full sm:text-lg '
        placeholder='Enter a body paragraph:'
      />
      <div className='flex flex-row justify-between'>
        <button className='btn btn-xs btn-neutral-content sm:btn'>Add</button>
        <button className='btn btn-xs bg-error-content sm:btn sm:bg-error-content'>
          Delete
        </button>
      </div>
    </Fragment>
  );
};

export default BodyBlock;
