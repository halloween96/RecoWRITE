import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Nav from './Nav';
import Home from './Home';
import Reco from './Reco';
import Print from './Print';
import Loading from './Loading';
import Check from './Check';
import Detail from './Detail';
import Modal from './Modal';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Router>
      <RecoilRoot>
        <div className='relative w-full'>
          <Nav openLoginModal={openLoginModal} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Reco' element={<Reco />} />
            <Route path='/Print' element={<Print />} />
            <Route path='/Loading' element={<Loading />} />
            <Route path='/Check' element={<Check />} />
            <Route path="/receipt/:receiptId" element={<Detail />} />
          </Routes>
        </div>
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        </Modal>
      </RecoilRoot>
    </Router>
  );
}

export default App;
