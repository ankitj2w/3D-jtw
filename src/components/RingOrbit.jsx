
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



// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import image from "../../public/assets/image.png";
// import imagecopy from "../../public/assets/imagecopy.png";
// import app360 from "../../public/assets/app360.png";
// import aiinfra from "../../public/assets/aiinfra.png";

// const products = [
//   { id: 1, name: "J2W Offerletter", role: "AI-powered unified platform for swift skill fulfillment.", profile: image },
//   { id: 2, name: "J2W Premier Lounge", role: "India's first AI-powered niche talent delivery platform.", profile: "https://www.joulestowatts.com/assets/Premier-6b2ce225.png" },
//   { id: 3, name: "J2W Align360", role: "All-in-one consultant dashboard for project & client management.", profile: "https://www.joulestowatts.com/assets/Portal-14eb934d.png" },
//   { id: 4, name: "J2W App", role: "Mobile-first talent & project ecosystem.", profile: imagecopy },
//   { id: 5, name: "Align360 App", role: "Full 360° consultant workflow on mobile.", profile: app360 },
//   { id: 6, name: "AI Infusion Tech", role: "AI-infused development & infrastructure solutions.", profile: aiinfra },
// ];

// const safeImage = (e) => {
//   e.currentTarget.src = "https://placehold.co/160x160/1E1B4B/8B5CF6?text=J2W";
// };

// export default function Orbital3DRing() {
//   const [activeIndex, setActiveIndex] = React.useState(0);

//   // Orbital settings
//   const containerRadius = 180; // Distance from center to card center
//   const profileSize = 140;     // Card size when inactive
//   const activeSize = 200;      // Active card size

//   const getRotation = (index) => {
//     return (index - activeIndex) * (360 / products.length);
//   };

//   const next = () => setActiveIndex((i) => (i + 1) % products.length);
//   const prev = () => setActiveIndex((i) => (i - 1 + products.length) % products.length);

//   React.useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "ArrowRight") next();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   const activeImgSrc = typeof products[activeIndex].profile === "string" 
//     ? products[activeIndex].profile 
//     : products[activeIndex].profile.src;

//   return (
//     <>
//       <div className="min-h-screen bg-black flex items-center justify-center p-6">
//         <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

//           {/* LEFT: Clean 2D Orbital Ring */}
//           <div className="relative flex items-center justify-center h-[500px] sm:h-[600px]">
//             <div 
//               className="relative" 
//               style={{ width: containerRadius * 2 + activeSize, height: containerRadius * 2 + activeSize }}
//             >
//               {/* Dashed Orbit Path */}
//               <div
//                 className="absolute rounded-full border-2 border-dashed border-purple-500/30"
//                 style={{
//                   width: containerRadius * 2,
//                   height: containerRadius * 2,
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                 }}
//               />

//               {/* Orbiting Cards */}
//               {products.map((item, i) => {
//                 const rotation = getRotation(i);
//                 const isActive = i === activeIndex;
//                 const imgSrc = typeof item.profile === "string" ? item.profile : item.profile.src;

//                 return (
//                   <motion.div
//                     key={item.id}
//                     animate={{
//                       rotate: rotation,
//                       scale: isActive ? 1.4 : 1,
//                     }}
//                     transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
//                     style={{
//                       position: "absolute",
//                       width: isActive ? activeSize : profileSize,
//                       height: isActive ? activeSize : profileSize,
//                       top: `calc(50% - ${(isActive ? activeSize : profileSize) / 2}px)`,
//                       left: `calc(50% - ${(isActive ? activeSize : profileSize) / 2}px)`,
//                       transformOrigin: "center",
//                     }}
//                     className="origin-center"
//                   >
//                     {/* Counter-rotate to keep image upright */}
//                     <motion.div
//                       animate={{ rotate: -rotation }}
//                       transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
//                       className="w-full h-full"
//                     >
//                       <motion.div
//                         onClick={() => setActiveIndex(i)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="w-full h-full cursor-pointer"
//                       >
//                         <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 transition-all ${
//                           isActive 
//                             ? "border-purple-500 ring-8 ring-purple-500/40 shadow-purple-500/60" 
//                             : "border-white/30 hover:border-purple-400"
//                         }`}>
//                           <img
//                             src={imgSrc}
//                             alt={item.name}
//                             onError={safeImage}
//                             className="w-full h-full object-cover"
//                           />
//                           {isActive && (
//                             <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent" />
//                           )}
//                         </div>

//                         {/* Active Label */}
//                         {isActive && (
//                           <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 100 }}
//                             exit={{ opacity: 0 }}
//                             className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-2xl font-bold text-purple-300 whitespace-nowrap"
//                           >
//                             {item.name}
//                           </motion.p>
//                         )}
//                       </motion.div>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}

//               {/* Navigation Arrows */}
//               <button
//                 onClick={prev}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
//               >
//                 <ChevronLeft className="w-8 h-8 text-white" />
//               </button>
//               <button
//                 onClick={next}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
//               >
//                 <ChevronRight className="w-8 h-8 text-white" />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: Detail Card */}
//           <div className="flex justify-center lg:justify-start">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeIndex}
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="bg-gradient-to-br from-purple-900/40 via-black/90 to-black/70 backdrop-blur-2xl rounded-3xl p-10 max-w-lg border border-purple-500/50 shadow-2xl"
//               >
//                 <motion.div
//                   initial={{ scale: 0.8, rotateY: 30 }}
//                   animate={{ scale: 1, rotateY: 0 }}
//                   transition={{ delay: 0.2, duration: 0.6 }}
//                   className="relative"
//                 >
//                   <img
//                     src={activeImgSrc}
//                     alt={products[activeIndex].name}
//                     onError={safeImage}
//                     className="w-72 h-72 mx-auto rounded-3xl object-cover shadow-2xl border-4 border-purple-500/70"
//                   />
//                   <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-800/50 to-transparent pointer-events-none" />
//                 </motion.div>

//                 <h2 className="text-5xl font-bold text-center mt-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
//                   {products[activeIndex].name}
//                 </h2>
//                 <p className="text-gray-300 text-center mt-8 text-lg leading-relaxed max-w-md mx-auto">
//                   {products[activeIndex].role}
//                 </p>

//                 <div className="mt-12 text-center">
//                   <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl rounded-full transition-all hover:scale-110 shadow-2xl shadow-purple-600/50">
//                     Explore Now
//                   </button>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }