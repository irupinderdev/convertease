// components/Navbar.js
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary p-4 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-semibold text-xl">Convert Ease</div>
          <div className="lg:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 5.293a1 1 0 011.414 0L12 12.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm15 4a1 1 0 100-2H4a1 1 0 100 2h15zm-1 5a1 1 0 011-1h1a1 1 0 010 2h-1a1 1 0 01-1-1z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
            <a href="#" className="text-white hover:text-gray-300 mr-4">Home</a>
            <a href="#" className="text-white hover:text-gray-300 mr-4">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
