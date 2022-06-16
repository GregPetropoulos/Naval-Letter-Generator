// Author: Greg Petropoulos
// Date:6.12.22
// Naval Letter Format Generator 



import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';

function App() {
  return (
    <main className='container mx-auto'>
      <Header />
      <Form />
      {/* <Footer /> footer must go in the form for now, its pushing on UI AT 275px and less*/}
    </main>

  );
}

export default App;
