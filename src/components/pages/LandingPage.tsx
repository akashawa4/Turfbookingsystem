import React from 'react';
import HeroBanner from '../landing/HeroBanner';
import CategoriesSection from '../landing/CategoriesSection';
import FeaturedTurfs from '../landing/FeaturedTurfs';

const LandingPage = () => {
  return (
    <div>
      <HeroBanner />
      <CategoriesSection />
      <FeaturedTurfs />
    </div>
  );
};

export default LandingPage;