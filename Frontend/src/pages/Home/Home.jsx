import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import CustomerReview from '../../components/CustomerReview/CustomerReview';
import AboutUs from '../../components/AboutUs/AboutUs';


const Home = () => {

  const [category, setCategory] = useState("All");


  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <CustomerReview/>
      <AboutUs/>
    </div>
  )
}

export default Home
