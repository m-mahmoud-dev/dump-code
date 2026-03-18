import { useState } from "react";
import Dropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">MM</div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>

          <Dropdown />

          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      </div>

      {isOpen && <MobileMenu />}
    </nav>
  );
}