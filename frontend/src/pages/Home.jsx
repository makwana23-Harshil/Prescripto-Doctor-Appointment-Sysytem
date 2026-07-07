import React from 'react'
import Header from '../components/header';
import Speciality_menu from '../components/Speciality_Menu';
import Top_Doctors from '../components/Top_Doctors';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Header />
      <Speciality_menu />
      <Top_Doctors />
      <Banner />

    </div>
  )
}

export default Home