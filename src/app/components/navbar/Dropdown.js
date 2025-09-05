import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Dropdown = ({ tabs, isOpen }) => {
  const dropdownRef = useRef(null);

  // This will be used to trigger the animation based on `isOpen`
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 left-4 font-jakarta font-semibold bg-white/70 backdrop-blur-md shadow-lg rounded-md px-3 p-2 transition-all ease-out duration-300"
      style={{
        opacity,
        pointerEvents: opacity === 0 ? "none" : "auto", // Disable pointer events when opacity is 0
      }}
    >
      <div className="text-[16px] max-1060:text-[13px] text-black flex flex-col gap-1">
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <Link
              href={tab.href}
              className={`hover:text-purple-600 px-4 p-1 ${
                opacity === 0 ? "cursor-not-allowed" : ""
              }`}
            >
              {tab.label}
            </Link>
            {index < tabs.length - 1 && (
              <div className="h-[1px] w-full bg-gray-500"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
