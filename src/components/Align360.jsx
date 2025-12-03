"use client";

import React from "react";
import align360 from "../../public/assets/align360-logo.png"
const DotIcon = () => <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="currentColor" />
</svg>;
const coderData = {
    name: 'Zane Whitaker',
    role: 'Frontend Developer',
    seniority: 'Mid-Level',
    location: 'Bangladesh',
    skills: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'TailwindCSS', 'CSS', 'Figma', 'GitHub', 'HTML', 'Astro', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Git']
};
const CoderProfileCard = () => {
    return (<div className="w-full mx-auto  dark:from-[#000000] dark:to-[#0a0d37]  dark:border-[#1b2c68a0] relative rounded-lg  shadow-lg">


        <a
            href="/"
            className="text-xl pl-5 font-bold transition-colors text-neutral-400 hover:text-white"
        >
            <img src={align360} alt="Align360 Logo" className="h-80 w-auto mb-2" />
        </a>

        <div className="flex flex-row">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
        </div>
        <p className="text-[20px] pl-5 mt-2">'Unlock Opportunities, Share Referrals, and Get Support'</p>



    </div>
    );
};
const Portfolio = () => {
    return <div className="w-full mb-5 relative flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
        { }
        <div className="absolute inset-0 z-0 dark:hidden" style={{

        }} />

        { }
        <div className="absolute inset-0 z-0 hidden dark:block" style={{
            background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)"
        }} />

        { }
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">

                { }
                <div className="flex flex-col gap-4 sm:gap-6 items-start text-left order-2 lg:order-1 animate-fade-in-up">


                    <div className="relative">
                        <p className="text-3xl">Empowering Consultants with </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white">


                            <span className="bg-gradient-to-r mt-2 from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Align360
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-1 sm:gap-3 my-2 sm:my-4">
                        <span className="px-3 sm:px-4 py-1 sm:py-2
                 bg-gray-900/80 dark:bg-white/10 border
                  border-gray-700 dark:border-gray-600 rounded-full
                   text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm
                    hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Job Offering Portal</span>
                        <span className="px-3 sm:px-4 py-1 sm:py-2
                 bg-gray-900/80 dark:bg-white/10 border
                  border-gray-700 dark:border-gray-600 rounded-full
                   text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm
                    hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Scheduling Interview</span>
                        <span className="px-3 sm:px-4 py-1 sm:py-2
                 bg-gray-900/80 dark:bg-white/10 border
                  border-gray-700 dark:border-gray-600 rounded-full
                   text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm
                    hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Job Referral Program</span>
                       
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
                        At J2W we easily manage clients, track projects, collaborate with teams and streamline your workflow all from a single intuitive dashboard designed for consultants.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
                        <button className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                            Click to explore
                        </button>
                        {/* <button className="px-6 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                            Get Resume
                        </button> */}
                    </div>
                </div>

                { }
                <div className="order-1 lg:order-2 animate-fade-in-up">
                    <CoderProfileCard />
                </div>

            </div>
        </div>
    </div>;
};
export default Portfolio;
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .hover\\:shadow-3xl:hover {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}