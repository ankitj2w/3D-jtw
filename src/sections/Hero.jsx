
import HeroText from "../components/HeroText";



import { useMediaQuery } from "react-responsive";
import ParallaxBackground from "../components/parallaxBackground";


const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />

      
    </section>
  );
};


export default Hero;
