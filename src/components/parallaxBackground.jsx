// // import { motion, useScroll, useSpring, useTransform } from "motion/react";

// // const ParallaxBackground = () => {
// //   const { scrollYProgress } = useScroll();
// //   const x = useSpring(scrollYProgress, { damping: 50 });
// //   const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
// //   const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
// //   const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
// //   const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

// //   return (
// //     <section className="absolute inset-0 bg-black/40">
// //       <div className="relative h-screen overflow-y-hidden">
// //         {/* Background Sky */}
// //         <div
// //           className="absolute inset-0 w-full h-screen -z-50"
// //           style={{
// //             backgroundImage: "url(/assets/sky.jpg)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //           }}
// //         />
// //           <motion.div
// //           className="absolute inset-0 -z-40 ml-200"
// //           style={{
// //             backgroundImage: "url(/assets/ai-skull.png)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //             y: mountain3Y,
// //           }}
// //         />
// //         {/* Mountain Layer 3 */}
// //         <motion.div
// //           className="absolute inset-0 -z-40"
// //           style={{
// //             backgroundImage: "url(/assets/mountain-3.png)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //             y: mountain3Y,
// //           }}
// //         />
// //         {/* Planets */}
// //         {/* <motion.div
// //           className="absolute inset-0 -z-30"
// //           style={{
// //             backgroundImage: "url(/assets/planets.png)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //             x: planetsX,
// //           }}
// //         /> */}
// //         {/* Mountain Layer 2 */}
// //         <motion.div
// //           className="absolute inset-0 -z-20"
// //           style={{
// //             backgroundImage: "url(/assets/mountain-2.png)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //             y: mountain2Y,
// //           }}
// //         />
// //         {/* Mountaine Layer 1 */}
// //         <motion.div
// //           className="absolute inset-0 -z-10"
// //           style={{
// //             backgroundImage: "url(/assets/mountain-1.png)",
// //             backgroundPosition: "bottom",
// //             backgroundSize: "cover",
// //             y: mountain1Y,
// //           }}
// //         />
// //       </div>
// //     </section>
// //   );
// // };

// // export default ParallaxBackground;




// import { motion, useScroll, useSpring, useTransform } from "motion/react";
// import { useEffect } from "react";

// const ParallaxBackground = () => {
//   const { scrollYProgress } = useScroll();
//   const x = useSpring(scrollYProgress, { damping: 50 });

//   // 🔥 Force animation to play on every load / refresh
//   useEffect(() => {
//     x.set(0);     // reset to beginning
//     setTimeout(() => x.set(scrollYProgress.get()), 50); 
//   }, []);

//   const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
//   const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
//   const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
//   const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

//   return (
//     <section className="absolute inset-0 bg-black/40">
//       <div className="relative h-screen overflow-y-hidden">
//         {/* Background Sky */}
//         <div
//           className="absolute inset-0 w-full h-screen -z-50"
//           style={{
//             backgroundImage: "url(/assets/sky.jpg)",
//             backgroundPosition: "bottom",
//             backgroundSize: "cover",
//           }}
//         />

//         {/* AI Skull */}
//         <motion.div
//           className="absolute inset-0 -z-40 ml-200"
//           style={{
//             backgroundImage: "url(/assets/ai-skull.png)",
//             backgroundPosition: "bottom",
//             backgroundSize: "cover",
//             y: mountain3Y,
//           }}
//         />

//         {/* Mountain Layer 3 */}
//         <motion.div
//           className="absolute inset-0 -z-40"
//           style={{
//             backgroundImage: "url(/assets/mountain-3.png)",
//             backgroundPosition: "bottom",
//             backgroundSize: "cover",
//             y: mountain3Y,
//           }}
//         />

//         {/* Mountain Layer 2 */}
//         <motion.div
//           className="absolute inset-0 -z-20"
//           style={{
//             backgroundImage: "url(/assets/mountain-2.png)",
//             backgroundPosition: "bottom",
//             backgroundSize: "cover",
//             y: mountain2Y,
//           }}
//         />

//         {/* Mountain Layer 1 */}
//         <motion.div
//           className="absolute inset-0 -z-10"
//           style={{
//             backgroundImage: "url(/assets/mountain-1.png)",
//             backgroundPosition: "bottom",
//             backgroundSize: "cover",
//             y: mountain1Y,
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default ParallaxBackground;




import { motion, useScroll, useSpring, useTransform, useAnimate } from "framer-motion";
import { useEffect } from "react";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });

  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  // Add this for the skull entrance animation on load
  const [skullScope, animateSkull] = useAnimate();

  useEffect(() => {
    // Trigger entrance animation every time the component mounts (page load/refresh)
    animateSkull(
      skullScope.current,
      { opacity: [0, 1], y: [150, 0] },
      { duration: 1.8, ease: "easeOut" }
    );
  }, [animateSkull, skullScope]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />

        {/* AI Skull with entrance animation on load + scroll parallax */}
        <motion.div
          ref={skullScope}
          className="absolute inset-0 -z-40 ml-200"
          style={{
            backgroundImage: "url(/assets/ai-skull.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y, // Still follows scroll like mountain3
            opacity: 0,    // Start hidden, animated in by useAnimate
          }}
        />

        {/* Mountain Layer 3 (unchanged) */}
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
        />

        {/* Planets (still commented as in your code) */}
        {/* <motion.div ... /> */}

        {/* Mountain Layer 2 */}
        {/* <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        /> */}

        {/* Mountain Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;

