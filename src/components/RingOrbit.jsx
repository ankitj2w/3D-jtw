
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../public/assets/image.png"
import imagecopy from "../../public/assets/imagecopy.png"
import app360 from "../../public/assets/app360.png"
import aiinfra from "../../public/assets/aiinfra.png"



const people = [
  {
    id: 1,
    name: "J2W Offerletter",
    role: "we offer an intelligent solution in the form of OfferLetter, our unified, AI-powered platform designed to fulfill skill requirements swiftly and precisely.",
    email: "einstein@example.com",
    profile: image,
  },
  {
    id: 2,
    name: "J2W Premier Lounge",
    role: "Premiere Lounge by JoulestoWatts offers a specialized, AI-powered platform designed to identify and deliver top-tier talent for niche roles. It is India's First-of-Its-Kind Solution for niche skill fulfillment.",
    email: "newton@example.com",
    profile: "https://www.joulestowatts.com/assets/Premier-6b2ce225.png"
  },
  {
    id: 3,
    name: "J2W Align360",
    role: "At J2W we easily manage clients, track projects, collaborate with teams and streamline your workflow all from a single intuitive dashboard designed for consultants.",
    email: "curie@example.com",
    profile: "https://www.joulestowatts.com/assets/Portal-14eb934d.png"
  },
  {
    id: 4,
    name: "J2W app",
    role: "J2W Offerletter",
    email: "tesla@example.com",
    profile: imagecopy,
  },
  {
    id: 5,
    name: "Align360 App",
    role: "360 Application",
    email: "darwin@example.com",
    profile: app360,
  },
  {
    id: 6,
    name: "AI Infusion Tech",
    role: "AI infused development",
    // email: "galileo@example.com",
    profile: aiinfra,
  },
  // {
  //   id: 7,
  //   name: "Stephen Hawking",
  //   role: "Theoretical Physicist",
  //   email: "hawking@example.com",
  //   profile: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"
  // },
  // {
  //   id: 8,
  //   name: "Richard Feynman",
  //   role: "Theoretical Physicist",
  //   email: "feynman@example.com",
  //    profile: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"

  // }
];

const safeImage = (e) => {
  e.target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
};

export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  const containerRadius = isMobile ? 120 : 200;
  const profileSize = isMobile ? 64 : 140;
  const orbitSize = containerRadius * 2 + profileSize;

  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

  const getRotation = (index) => (index - activeIndex) * (360 / people.length);

  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-[600px]  bg-black p-6 gap-[180px]">
      
      {/* Left Side: Orbit + Navigation */}
      <div className="relative flex flex-col items-center" style={{ width: orbitSize }}>
        
        {/* Orbit Circle */}
        <div
          className="absolute rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Orbiting Profile Images */}
        {people.map((person, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={person.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                position: "absolute",
                width: profileSize,
                height: profileSize,
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full h-full"
              >
                <motion.img
                  src={person.profile}
                  alt={person.name}
                  onError={safeImage}
                  onClick={() => setActiveIndex(i)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer shadow-lg transition-all ${
                    i === activeIndex
                      ? "border-4 border-indigo-500 ring-4 ring-indigo-500/30"
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}

      
      </div>

      {/* Right Side: Active Person Card */}
      <div className="flex flex-col justify-center max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={people[activeIndex].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            
          >
            <div className="text-center">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={people[activeIndex].profile}
                alt={people[activeIndex].name}
                onError={safeImage}
                className="w-90 h-90 rounded-[40px] object-cover  shadow-2xl mx-auto "
              />

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {people[activeIndex].name}
              </h2>

              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mt-3">
               
                <span className="text-lg">{people[activeIndex].role}</span>
              </div>

             

              {/* <button className="mt-10 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-lg transition-all hover:scale-105 shadow-xl">
                Connect
              </button> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}