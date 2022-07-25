// Author: Greg Petropoulos
// Date:6.12.22
// Naval Letter Format Generator

import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Business from './components/Business';
import Memo from './components/Memo';
import Executive from './components/Executive';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const initialState = {
    copyTo: [{ cId: 1, copy: '' }],
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
    sigTitle: '',
    signature: '',
    ssic: '',
    subject: '',
    toBilletUnitName: '',
    via: []
  };

  const [data, setData] = useState(initialState);
  console.log('data in appjs', data);
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Form initialState={initialState} data={data} setData={setData} />} />
        <Route path='memo' element={<Memo />} />
        <Route path='business' element={<Business />} />
        <Route path='executive' element={<Executive />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
