
import Radios from './Radios';
import InputFields from './InputFields';
import BodyBlock from './BodyBlock';
import ClosingBlock from './ClosingBlock';

const Form = ({ initialState, data, setData }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO SUBMIT A DOCX FOR DOWNLOAD
    alert('This from was submitted');
  };

  return (
    <main className='container mx-auto'>
      {/* // <div className='form-control'> */}
      <h1 className='font-bold text-center my-3  sm:text-3xl md:text-2xl'>
        Naval Letter Format Generator
      </h1>
      <form onSubmit={onSubmit} className=' form flex flex-col gap-3'>
        <InputFields data={data} setData={setData} />
        <Radios data={data} setData={setData} />
        <BodyBlock data={data} setData={setData} />
        <ClosingBlock initialState={initialState} data={data} setData={setData} />
      </form>
    </main>
    // </div>
  );
};

export default Form;

// {/* <main className='container mx-auto'>
//       <Header />
//       <Form data={data} setData={setData} />
//      <Footer /> footer must go in the form for now, its pushing on UI AT 275px and less
//     </main> */}
