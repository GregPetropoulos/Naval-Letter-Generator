
import { Packer,Document,Paragraph, TextRun} from 'docx';
import { saveAs } from 'file-saver';
import { StandardLetterDocument } from './StandardLetterDocument';
import InputFields from './InputFields';
import Radios from './Radios';
import BodyBlock from './BodyBlock';
import ClosingBlock from './ClosingBlock';
const Form = ({ initialState, data, setData }) => {

const generate=()=>{
  const doc =  new Document(StandardLetterDocument(data))
  
  Packer.toBlob(doc).then(blob => {
    console.log(blob);
    saveAs(blob, "StandardNavalLetter.docx");
    console.log("Document created successfully");
  });
}


  const onSubmit = (e) => {
    e.preventDefault();
    // TODO SUBMIT/GENERATE A DOCX FOR DOWNLOAD
    console.log('onSubmit');
    generate()
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
        <ClosingBlock data={data} setData={setData} />
        <button
          type='submit'
          className='block btn btn-xs my-3 btn-info sm:btn sm:flex sm:w-1/2 '>
          Generate Naval Letter
        </button>
        <button
          type='reset'
          onClick={() => setData(initialState)}
          className='block btn btn-xs my-3 btn-info sm:btn sm:flex sm:w-1/2 '>
          Reset
        </button>
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
