import { useState } from "react";
import { motion } from "motion/react";
import align360 from "../../public/assets/align360-logo.png"
function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work">
          Work
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <div className="
    // fixed inset-x-0 z-20   w-full
    // backdrop-blur-lg bg-white
    // ">
       <div className="
    fixed inset-x-0 z-20   w-full
   
    ">
      <div className="ml-43 mr-43 mt-4 mb-4">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            <img src={align360} alt="Align360 Logo" className="h-20 w-auto" />
          </a>
         
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>

          
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
