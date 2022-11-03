import React from 'react';
import HeroSection from "./components/HeroSection";
// import { useProductContext } from "./context/productcontex";
//{myName}

const About = () => {
  // const { myName } = useProductContext();

  const data = {
    name: "Ahmad Ecommerce",
  };

  return (
    <>
      <HeroSection myData={data} className="height"/>
    </>
  );
};

export default About;