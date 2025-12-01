
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";


const people = [
  {
    id: 1,
    name: "J2W Offerletter",
    role: "we offer an intelligent solution in the form of OfferLetter, our unified, AI-powered platform designed to fulfill skill requirements swiftly and precisely.",
    email: "einstein@example.com",
    profile: "https://www.joulestowatts.com/assets/offerletter-f4da36f7.png",
  },
  {
    id: 2,
    name: "J2W Premier Lounge",
    role: "Premiere Lounge by JoulestoWatts offers a specialized, AI-powered platform designed to identify and deliver top-tier talent for niche roles. It is India's First-of-Its-Kind Solution for niche skill fulfillment.",
    email: "newton@example.com",
    profile:"https://www.joulestowatts.com/assets/Premier-6b2ce225.png"
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
    name: "Nikola Tesla",
    role: "Inventor & Engineer",
    email: "tesla@example.com",
    profile: "https://upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG"
  },
  {
    id: 5,
    name: "Charles Darwin",
    role: "Naturalist & Biologist",
    email: "darwin@example.com",
    profile:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-79035252.jpg?crop=1xw:1.0xh;center,top&resize=640:*"
  },
  {
    id: 6,
    name: "Galileo Galilei",
    role: "Astronomer & Physicist",
    email: "galileo@example.com",
    profile:
      "https://res.cloudinary.com/aenetworks/image/upload/c_fill,ar_2,w_3840,h_1920,g_auto/dpr_auto/f_auto/q_auto:eco/v1/galileo-galilei-gettyimages-51246872?_a=BAVAZGDX0"
  },
  {
    id: 7,
    name: "Stephen Hawking",
    role: "Theoretical Physicist",
    email: "hawking@example.com",
    profile: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"
  },
  {
    id: 8,
    name: "Richard Feynman",
    role: "Theoretical Physicist",
    email: "feynman@example.com",
     profile: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"
     
  }
];

const safeImage = (e) => {
  const target = e.target;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};

export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const isMobile = useIsMobile();

  const containerRadius = isMobile ? 120 : 240;
  const profileSize = isMobile ? 80 : 130;
  const containerSize = containerRadius * 2 + 100;

  const getRotation = React.useCallback(
    (index) => (index - activeIndex) * (360 / people.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

  const handleProfileClick = React.useCallback(
    (index) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center
       w-full p-4 gap-30 bg-white dark:bg-[#030412] transition-colors duration-300"   

      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* LEFT SIDE — ORBIT AVATARS */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* ⭐ YELLOW GLOWING ORBITAL RING ⭐ */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            border: "3px  rgba(255, 215, 0, 0.9)",
            boxShadow: "0 0 15px 1px rgba(255, 215, 0, 0.6)",
            filter: "blur(0.5px)",
          }}
        ></div>

        {people.map((p, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 20 : 10
              }}
            >
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="w-full h-full"
              >
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{
                    scale: 1.15,
                    boxShadow:
                      "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-4 border-yellow-500 dark:border-yellow-500 shadow-[15px 0 15px 0 rgba(255, 215, 0, 0.6)]"
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT SIDE — ACTIVE PROFILE CARD */}

  <div className="flex justify-center items-center w-full">
  <AnimatePresence mode="wait">
    <motion.div
      key={people[activeIndex].id}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="
        z-10 bg-white dark:bg-gray-950 shadow-2xl rounded-2xl p-6
        w-[90%] md:w-[70%] lg:w-[50%] 
        max-w-2xl
        text-center border border-gray-200 dark:border-gray-800
      "
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        src={people[activeIndex].profile}
        alt={people[activeIndex].name}
        onError={safeImage}
        className="
          w-28 h-28 md:w-32 md:h-32 
          rounded-full mx-auto -mt-14 
          border-4 border-white dark:border-black 
          object-cover shadow-lg
        "
      />

      <h2 className="mt-4 text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
        {people[activeIndex].name}
      </h2>

      <div className="flex items-center justify-center text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
        <Briefcase size={16} className="mr-1" />
        {people[activeIndex].role}
      </div>

      <div className="flex items-center justify-center text-sm md:text-base text-gray-500 dark:text-gray-300 mt-1">
        <Mail size={16} className="mr-1" />
        {people[activeIndex].email}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button 
          onClick={prev} 
          className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-900 shadow"
        >
          <ChevronLeft size={22} className="text-gray-700 dark:text-gray-300" />
        </button>

        <button 
          className="
            px-6 py-2 text-sm md:text-base 
            rounded-full bg-indigo-600 text-white shadow-md
          "
        >
          Connect
        </button>

        <button 
          onClick={next} 
          className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-900 shadow"
        >
          <ChevronRight size={22} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</div>


    </div>
  );
}
