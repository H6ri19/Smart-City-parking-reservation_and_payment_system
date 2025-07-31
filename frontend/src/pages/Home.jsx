import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopParking from '../components/TopParking';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopParking />
      <Banner />
    </div>
  );
};

export default Home;
