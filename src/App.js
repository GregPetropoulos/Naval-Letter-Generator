// Author: Greg Petropoulos
// Date:6.12.22
// Naval Letter Format Generator

import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState({
    copyTo:[{cId:1,copy:''}],
    date: '',
    enclosures: [],
    filename: '',
    fromBilletUnitName: '',
    line1UnitName: '',
    line2Address: '',
    line3Address: '',
    originatorCode: '',
    paragraphs: [{ pId: 1, paragraph: '', subParagraph: [] }],
    references: [],
    sigTitle:'',
    signature:'',
    ssic: '',
    subject: '',
    toBilletUnitName: '',
    via: [],
  });
  console.log('data in appjs', data);
  return (
    <main className='container mx-auto'>
      <Header />
      <Form data={data} setData={setData} />
      {/* <Footer /> footer must go in the form for now, its pushing on UI AT 275px and less*/}
    </main>
  );
}

export default App;
