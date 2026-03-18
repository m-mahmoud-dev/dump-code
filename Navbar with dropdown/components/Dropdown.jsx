import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-gray-300 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Services ▾
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg"
          role="menu"
        >
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-700"
            role="menuitem"
          >
            Design
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-700"
            role="menuitem"
          >
            Development
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-700"
            role="menuitem"
          >
            Marketing
          </a>
        </div>
      )}
    </div>
  );
}