import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Home from './Views/Home/Home.jsx';
import Form from './Views/Form/Form.jsx';
import { Landing } from './Views/Landing Page/Landing_Page.jsx';
import { ErrorPage } from './Views/Error Page/Error_Page.jsx';
import { DogDetail } from './Views/Detail/Detail';

import { getAllDogs, getAllTemps } from './Redux/actions';


import styles from './App.module.css';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemps());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<DogDetail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {location.pathname !== '/' && <Footer />}
    </div>
  );
}

export default App;
