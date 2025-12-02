import React from "react";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import OrbitCarousel from "./components/RingOrbit";
import TypewriterView from "./components/TextAnimation";
import ParticleView from "./components/TextAnimation";
import Logomarquee from "./components/Scroller";
import GlowLine from "./components/GlowLine";
import ThreeDCarousel from "./components/Carosol-3D";
import Navbar from "./sections/Navbar";
import SlideInView from "./components/TextAnimation";
import AuroraView from "./components/AuraText";
import Intro360 from "./components/Align360";
import Portfolio4 from "./components/Align360";
import Portfolio from "./components/Align360";




const App = () => {
  return (
    // <div className="container mx-auto max-w-7xl">
     <div className="w-full">
      <Navbar />
      <Hero />
       
       <SlideInView />
       <Portfolio />
    
     
       
   
      <OrbitCarousel />

      
     
      <About />
      <AuroraView />
      <ThreeDCarousel />
     
      {/* <Projects /> */}
      {/* <Logomarquee /> */}
      {/* <Experiences /> */}
      <Testimonial />
      {/* <Contact /> */}
      {/* <Footer/> */}
    </div>
  );
};

export default App;
