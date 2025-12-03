'use client';

import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import image from "../../public/assets/image.png"
import aiinfra from "../../public/assets/aiinfra.png"
const FALLBACK = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' + 'width="160" height="220"><rect width="100%" height="100%" ' + 'fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle"' + ' text-anchor="middle" fill="%234a5568" font-size="18">Image</text></svg>';
const DEFAULT_IMAGES = [image, 'https://www.joulestowatts.com/assets/Premier-6b2ce225.png', 'https://www.joulestowatts.com/assets/Portal-14eb934d.png', aiinfra];
// const DEFAULT_IMAGES = [image, 'https://www.joulestowatts.com/assets/Premier-6b2ce225.png', 'https://www.joulestowatts.com/assets/Portal-14eb934d.png', aiinfra, 'https://i.pinimg.com/736x/07/cf/4a/07cf4a3a6f4144b4c7ac8e2ec5978dc1.jpg', 'https://i.pinimg.com/736x/5d/bf/f2/5dbff2b4c0fdcb9815e989f0db386f95.jpg'];
const DEFAULT_TEXT=["hellow","pic1","pic2","pic3"];
const CARD_W = 280;
const CARD_H = 340;
const RADIUS = 480;
const TILT_SENSITIVITY = 10;
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;
const Card = React.memo(({
  src,
  transform,
  cardW,
  cardH
}) => <div className="absolute" style={{
  width: cardW,
  height: cardH,
  transform,
  transformStyle: 'preserve-3d',
  willChange: 'transform'
}}>
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50
                 transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-900/70
                 hover:z-10" style={{
        backfaceVisibility: 'hidden'
      }}>
      <img src={src} alt="Carousel item" width={cardW} height={cardH} className="w-full h-full object-cover" loading="lazy" draggable="false" onError={e => {
        e.currentTarget.src = FALLBACK;
      }} />

    </div>
  </div>);
Card.displayName = 'Card';
const ThreeDCarousel = React.memo(({
  images = DEFAULT_IMAGES,
  radius = RADIUS,
  cardW = CARD_W,
  cardH = CARD_H
}) => {
  const parentRef = useRef(null);
  const wheelRef = useRef(null);
  const rotationRef = useRef(0);
  const tiltRef = useRef(0);
  const targetTiltRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const initialRotationRef = useRef(0);
  const lastInteractionRef = useRef(Date.now());
  const animationFrameRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = e => {
      if (!parentRef.current || isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();
      const parentRect = parentRef.current.getBoundingClientRect();
      const mouseY = e.clientY - parentRect.top;
      const normalizedY = (mouseY / parentRect.height - 0.5) * 2;
      targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current += velocityRef.current;
          velocityRef.current *= INERTIA_FRICTION;
        } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
          rotationRef.current += AUTOSPIN_SPEED;
        }
      }
      tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  const handleDragStart = useCallback(clientX => {
    lastInteractionRef.current = Date.now();
    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartRef.current = clientX;
    initialRotationRef.current = rotationRef.current;
  }, []);
  const handleDragMove = useCallback(clientX => {
    if (!isDraggingRef.current) return;
    lastInteractionRef.current = Date.now();
    const deltaX = clientX - dragStartRef.current;
    const newRotation = initialRotationRef.current + deltaX * DRAG_SENSITIVITY;
    velocityRef.current = newRotation - rotationRef.current;
    rotationRef.current = newRotation;
  }, []);
  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);
  const onMouseDown = e => handleDragStart(e.clientX);
  const onMouseMove = e => handleDragMove(e.clientX);
  const onTouchStart = e => handleDragStart(e.touches[0].clientX);
  const onTouchMove = e => handleDragMove(e.touches[0].clientX);
  const cards = useMemo(() => images.map((src, idx) => {
    const angle = idx * 360 / images.length;
    return {
      key: idx,
      src,
      transform: `rotateY(${angle}deg) translateZ(${radius}px)`
    };
  }), [images, radius]);
  return <div ref={parentRef} className="w-full h-full flex items-center justify-center overflow-hidden font-sans cursor-grab active:cursor-grabbing" style={{
    userSelect: 'none'
  }} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={handleDragEnd}>
    <div className="relative" style={{
      perspective: 1500,
      perspectiveOrigin: 'center',
      width: Math.max(cardW * 1.5, radius * 2.2),
      height: Math.max(cardH * 1.8, radius * 1.5)
    }}>
      <div ref={wheelRef} className="relative" style={{
        width: cardW,
        height: cardH,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -cardW / 2,
        marginTop: -cardH / 2
      }}>
        {cards.map(card => <Card key={card.key} src={card.src} transform={card.transform} cardW={cardW} cardH={cardH} />)}
      </div>

    </div>
  </div>;
});
ThreeDCarousel.displayName = 'ThreeDCarousel';
export default ThreeDCarousel;



// 'use client';

// import React, { useMemo, useRef, useEffect, useCallback } from 'react';
// import image from "../../public/assets/image.png";
// import aiinfra from "../../public/assets/aiinfra.png";

// const FALLBACK =
//   'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="220"><rect width="100%" height="100%" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%234a5568" font-size="18">Image</text></svg>';

// const DEFAULT_IMAGES = [
//   image,
//   'https://www.joulestowatts.com/assets/Premier-6b2ce225.png',
//   'https://www.joulestowatts.com/assets/Portal-14eb934d.png',
//   aiinfra,
// ];

// const DEFAULT_TEXT = ["OfferLetter Tool", "Premier Portal", "Client Portal", "AI Infra"];

// const CARD_W = 280;
// const CARD_H = 340;
// const RADIUS = 380;
// const TILT_SENSITIVITY = 10;
// const DRAG_SENSITIVITY = 0.5;
// const INERTIA_FRICTION = 0.95;
// const AUTOSPIN_SPEED = 0.08;
// const IDLE_TIMEOUT = 2000;

// /* ---------------------------------------------------------
//    CARD COMPONENT — with text below (styled beautifully)
// ----------------------------------------------------------*/
// const Card = React.memo(({ src, text, transform, cardW, cardH }) => (
//   <div
//     className="absolute flex flex-col items-center"
//     style={{
//       width: cardW,
//       height: cardH + 60, // extra height for text
//       transform,
//       transformStyle: "preserve-3d",
//       willChange: "transform",
//     }}
//   >
//     {/* Card Image */}
//     <div
//       className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800
//                  border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/50
//                  transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:hover:shadow-gray-900/70
//                  hover:z-10"
//       style={{ backfaceVisibility: "hidden" }}
//     >
//       <img
//         src={src}
//         alt="Carousel item"
//         width={cardW}
//         height={cardH}
//         className="w-full h-full object-cover"
//         loading="lazy"
//         draggable="false"
//         onError={(e) => {
//           e.currentTarget.src = FALLBACK;
//         }}
//       />
//     </div>

//     {/* BEAUTIFUL TEXT BELOW */}
//     <p className="mt-3 text-center text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-wide">
//       {text}
//     </p>
//   </div>
// ));
// Card.displayName = "Card";


// /* ---------------------------------------------------------
//    MAIN 3D CAROUSEL
// ----------------------------------------------------------*/
// const ThreeDCarousel = React.memo(({ images = DEFAULT_IMAGES, radius = RADIUS, cardW = CARD_W, cardH = CARD_H }) => {
//   const parentRef = useRef(null);
//   const wheelRef = useRef(null);
//   const rotationRef = useRef(0);
//   const tiltRef = useRef(0);
//   const targetTiltRef = useRef(0);
//   const velocityRef = useRef(0);
//   const isDraggingRef = useRef(false);
//   const dragStartRef = useRef(0);
//   const initialRotationRef = useRef(0);
//   const lastInteractionRef = useRef(Date.now());
//   const animationFrameRef = useRef(null);

//   /* ------------------- MOUSE TILT ------------------- */
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!parentRef.current || isDraggingRef.current) return;
//       lastInteractionRef.current = Date.now();
//       const parentRect = parentRef.current.getBoundingClientRect();
//       const mouseY = e.clientY - parentRect.top;
//       const normalizedY = (mouseY / parentRect.height - 0.5) * 2;
//       targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   /* ------------------- ANIMATION LOOP ------------------- */
//   useEffect(() => {
//     const animate = () => {
//       if (!isDraggingRef.current) {
//         if (Math.abs(velocityRef.current) > 0.01) {
//           rotationRef.current += velocityRef.current;
//           velocityRef.current *= INERTIA_FRICTION;
//         } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
//           rotationRef.current += AUTOSPIN_SPEED;
//         }
//       }

//       tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

//       if (wheelRef.current) {
//         wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
//       }

//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     animationFrameRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrameRef.current);
//   }, []);

//   /* ------------------- DRAGGING ------------------- */
//   const handleDragStart = useCallback((clientX) => {
//     lastInteractionRef.current = Date.now();
//     isDraggingRef.current = true;
//     velocityRef.current = 0;
//     dragStartRef.current = clientX;
//     initialRotationRef.current = rotationRef.current;
//   }, []);

//   const handleDragMove = useCallback((clientX) => {
//     if (!isDraggingRef.current) return;
//     lastInteractionRef.current = Date.now();
//     const deltaX = clientX - dragStartRef.current;
//     const newRotation = initialRotationRef.current + deltaX * DRAG_SENSITIVITY;
//     velocityRef.current = newRotation - rotationRef.current;
//     rotationRef.current = newRotation;
//   }, []);

//   const handleDragEnd = useCallback(() => {
//     isDraggingRef.current = false;
//     lastInteractionRef.current = Date.now();
//   }, []);

//   /* ------------------- EVENTS ------------------- */
//   const onMouseDown = (e) => handleDragStart(e.clientX);
//   const onMouseMove = (e) => handleDragMove(e.clientX);
//   const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
//   const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);

//   /* ------------------- BUILD CARDS ------------------- */
//   const cards = useMemo(
//     () =>
//       images.map((src, idx) => ({
//         key: idx,
//         src,
//         text: DEFAULT_TEXT[idx] || "",
//         transform: `rotateY(${(idx * 360) / images.length}deg) translateZ(${radius}px)`,
//       })),
//     [images, radius]
//   );

//   return (
//     <div
//       ref={parentRef}
//       className="w-full h-full flex items-center justify-center overflow-hidden font-sans cursor-grab active:cursor-grabbing"
//       style={{ userSelect: "none" }}
//       onMouseDown={onMouseDown}
//       onMouseMove={onMouseMove}
//       onMouseUp={handleDragEnd}
//       onMouseLeave={handleDragEnd}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={handleDragEnd}
//     >
//       <div
//         className="relative"
//         style={{
//           perspective: 1500,
//           perspectiveOrigin: "center",
//           width: Math.max(cardW * 1.5, radius * 2.2),
//           height: Math.max(cardH * 2, radius * 1.6),
//         }}
//       >
//         <div
//           ref={wheelRef}
//           className="relative"
//           style={{
//             width: cardW,
//             height: cardH + 50,
//             transformStyle: "preserve-3d",
//             willChange: "transform",
//             position: "absolute",
//             left: "50%",
//             top: "50%",
//             marginLeft: -cardW / 2,
//             marginTop: -(cardH / 2),
//           }}
//         >
//           {cards.map((card) => (
//             <Card
//               key={card.key}
//               src={card.src}
//               text={card.text}
//               transform={card.transform}
//               cardW={cardW}
//               cardH={cardH}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });

// ThreeDCarousel.displayName = "ThreeDCarousel";

// export default ThreeDCarousel;
