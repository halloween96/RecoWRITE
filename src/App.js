import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


import Nav from './Nav';
import Home from './Home';
import Reco from './Reco';
import Print from './Print';
import Loading from './Loading';
import Check from './Check';
import Login from './Login';
import Register from './Register';
import Detail from './Detail';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className='relative w-full'>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Reco' element={<Reco />} />
            <Route path='/Print' element={<Print />} />
            <Route path='/Loading' element={<Loading />} />
            <Route path='/Check' element={<Check />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path="/receipt/:receiptId" element={<Detail />} />
          </Routes>       
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
