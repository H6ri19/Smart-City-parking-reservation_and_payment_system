import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import Topparking from '../components/Topparking';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <Topparking />
      <Banner />
    </div>
  );
};

export default Home;
