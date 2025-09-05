// components/Dropdown.js
import React, { useState } from "react";
import Link from "next/link";

const DropdownMob = ({ label, items, closeMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-white cursor-pointer text-left w-fit"
      >
        {label}
        {/* Show downwards "v" symbol when dropdown is closed, and upwards "v" when open */}
        <span
          className={`ml-2 text-sm transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          dropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {dropdownOpen && (
          <div className="bg-none text-white w-full">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Link
                  href={item.href}
                  onClick={() => {
                    closeMenu();
                  }}
                  className="block px-4 "
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMob;
