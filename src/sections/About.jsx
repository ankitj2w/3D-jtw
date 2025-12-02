import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";


const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
     <h2 className="text-heading font-bold tracking-tight text-gray-900 dark:text-white">
  About Us
</h2>

<div className="relative mt-8 md:mt-12 grid-black-color grid-3 min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-[#0a0e1f] dark:to-[#0f172a]">
  {/* Text Content - Left Side */}
  <div className="relative z-10 w-full max-w-xl pl-8 pr-12 md:pl-16 lg:pl-24">
    {/* Main Heading - Bold & Heroic */}
    <h2 className="
      text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
      font-black tracking-tighter 
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
      bg-clip-text text-transparent 
      leading-none 
      drop-shadow-lg
    ">
      Across the Globe
    </h2>

    {/* Subtext - Elegant & Readable */}
    <p className="
      mt-8 md:mt-10 
      text-lg md:text-xl lg:text-2xl 
      leading-relaxed 
      text-gray-700 dark:text-gray-300 
      font-medium 
      max-w-2xl
      [text-shadow:_0_2px_10px_rgba(0,0,0,0.1)]
    ">
      We operate as a truly multinational organization, delivering innovative
      solutions and seamless services to clients worldwide. With teams,
      partners, and operations spanning multiple continents, we empower
      businesses to scale, transform, and thrive in a globally connected world.
    </p>

    {/* Optional CTA - Looks fire */}
    <div className="mt-10 md:mt-12">
      <a
        href="#"
        className="
          inline-flex items-center gap-3 
          px-8 py-4 
          text-lg font-semibold 
          text-white 
          bg-gradient-to-r from-indigo-600 to-purple-700 
          rounded-full 
          shadow-2xl hover:shadow-indigo-500/50 
          transform hover:scale-105 active:scale-95 
          transition-all duration-300
        "
      >
        Explore Our Reach
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>

  {/* Globe - Position stays EXACTLY the same */}
  <figure className="absolute left-[65%] md:left-[68%]  lg:left-[50%] top-[7%] pointer-events-none">
    <Globe />
  </figure>

  {/* Subtle decorative elements */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
  </div>
</div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
        <p className="headtext">AI-Infused Infrastructure</p>
<p className="subtext">
  We design and deploy intelligent infrastructure systems powered by advanced
  AI capabilities. From automated workflows to predictive optimization and
  scalable cloud-native architectures, our solutions enable organizations to
  operate faster, smarter, and more efficiently across every layer of their
  digital ecosystem.
</p>

          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          {/* <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="GRASP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="SOLID"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Design Principles"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="SRP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/csharp-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/dotnet-pink.png"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/blazor-pink.png"
              containerRef={grid2Container}
            />
          </div> */}
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I'm based in Mars, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
      <div className="grid-default-color grid-5">
  <div className="z-10 w-[50%]">
    <p className="headText">Wide-Range Tech Stack</p>
    <p className="subtext">
      Our expertise spans a comprehensive set of languages, frameworks, and
      modern development tools, enabling us to build robust, scalable, and
      high-performance digital solutions across platforms.
    </p>
  </div>

  <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
    <Frameworks />
  </div>
</div>

      </div>
    </section>
  );
};

export default About;
