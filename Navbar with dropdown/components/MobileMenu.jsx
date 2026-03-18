import { useState } from "react";

export default function MobileMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="md:hidden mt-4 space-y-2">
      <a href="#" className="block px-2 py-2 hover:bg-gray-800 rounded">
        Home
      </a>
      <a href="#" className="block px-2 py-2 hover:bg-gray-800 rounded">
        About
      </a>

      {/* Dropdown */}
      <div>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left px-2 py-2 hover:bg-gray-800 rounded"
          aria-expanded={dropdownOpen}
        >
          Services ▾
        </button>

        {dropdownOpen && (
          <div className="ml-4 mt-2 space-y-1">
            <a href="#" className="block px-2 py-1 hover:bg-gray-800 rounded">
              Design
            </a>
            <a href="#" className="block px-2 py-1 hover:bg-gray-800 rounded">
              Development
            </a>
            <a href="#" className="block px-2 py-1 hover:bg-gray-800 rounded">
              Marketing
            </a>
          </div>
        )}
      </div>

      <a href="#" className="block px-2 py-2 hover:bg-gray-800 rounded">
        Contact
      </a>
    </div>
  );
}