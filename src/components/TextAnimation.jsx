// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// const TypewriterText = ({
//   text = "Welcome To The World of Joules To Watts...",
//   speed = 100,
//   deleteSpeed = 50,
//   pauseDuration = 2000,
//   loop = true,
//   className = "",
//   showCursor = true
// }) => {
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   useEffect(() => {
//     let timeout;
//     if (isPaused) {
//       timeout = setTimeout(() => {
//         setIsPaused(false);
//         if (loop) {
//           setIsDeleting(true);
//         }
//       }, pauseDuration);
//     } else if (isDeleting) {
//       if (displayText.length > 0) {
//         timeout = setTimeout(() => {
//           setDisplayText(text.substring(0, displayText.length - 1));
//         }, deleteSpeed);
//       } else {
//         setIsDeleting(false);
//       }
//     } else {
//       if (displayText.length < text.length) {
//         timeout = setTimeout(() => {
//           setDisplayText(text.substring(0, displayText.length + 1));
//         }, speed);
//       } else if (loop) {
//         setIsPaused(true);
//       }
//     }
//     return () => clearTimeout(timeout);
//   }, [displayText, isDeleting, isPaused, text, speed, deleteSpeed, pauseDuration, loop]);
//   return <div className={`font-mono ${className}`}>
//       <span className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
//         {displayText}
//         {showCursor && <motion.span animate={{
//         opacity: [1, 0]
//       }} transition={{
//         duration: 0.8,
//         repeat: Infinity,
//         repeatType: "reverse"
//       }} className="text-blue-500">
//             |
//           </motion.span>}
//       </span>
//     </div>;
// };
// export default function TypewriterView() {
//   return <TypewriterText />;
// }


'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlowLine from './GlowLine';


const ParticleText = ({
  text = "J2W Align360",
  className = "ml-99",
  particleCount = 80,
  particleColor = "#3b82f6"

}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none';
      particle.style.backgroundColor = particleColor;
      particle.style.opacity = Math.random().toString();
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      container.appendChild(particle);
      particles.push(particle);
    }
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const time = Date.now() * 0.001 + index;
        const x = Math.sin(time * 0.5) * 20 + Math.cos(time * 0.3) * 30;
        const y = Math.cos(time * 0.4) * 15 + Math.sin(time * 0.6) * 25;
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = (Math.sin(time * 2) * 0.5 + 0.5).toString();
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, particleColor]);
  return <div ref={containerRef} className={`relative inline-block ${className}`}>
      <motion.div initial={{
      opacity: 0,
      scale: 0.8
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 1,
      ease: "easeOut"
    }} className="text-4xl md:text-6xl  font-bold text-slate-800 dark:text-slate-200 relative z-10" style={{
      textShadow: `0 0 20px ${particleColor}40`,
      filter: `drop-shadow(0 0 10px ${particleColor}60)`
    }}>
        {text}
      </motion.div>
    </div>;
};
export default function ParticleView() {
  return <>
  <ParticleText />
  
    
  </>;
}