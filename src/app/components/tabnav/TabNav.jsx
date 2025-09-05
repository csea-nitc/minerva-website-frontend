import React, { useState } from "react";

export default function TabNav({ onTabChange, tabData }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleTabChange = (index) => {
    setSelectedTab(index);
    onTabChange(index);
  };

  return (
    <div>
      {/* Tab Navigation for larger screens */}
      <div className="hidden sm:flex flex-row w-full pr-4 max-w-5xl font-jakarta">
        {tabData.map((tab, index) => (
          <div key={tab} className="flex items-center">
            <button
              onClick={() => handleTabChange(index)}
              aria-selected={selectedTab === index}
              className={`px-4 sm:px-2 py-2 font-bold text-[1.2em] md:text-[1.5em] rounded-lg transition-colors duration-200 ${
                selectedTab === index
                  ? "bg-[#800080] text-white"
                  : "hover:bg-[#800080] hover:text-white"
              }`}
            >
              {tab}
            </button>
            {index < tabData.length - 1 && (
              <div className="mx-3 w-[4px] h-[3em] bg-[#800080] opacity-40 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Dropdown for smaller screens */}
      <div className="sm:hidden flex flex-col items-center w-full font-jakarta">
        <div className="relative w-full px-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? "true" : "false"}
            className="w-[100%] flex justify-between items-center px-4 py-2 text-[1.5em] font-extrabold text-[#800080] border-b-4 border-[#800080]"
          >
            <span>{tabData[selectedTab]}</span>
            {/* Arrow Icon */}
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <ul className=" z-10 w-full mt-2 bg-[#800080]">
              {tabData.map((tab, index) => (
                <li
                  key={tab}
                  onClick={() => {
                    handleTabChange(index);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-white hover:bg-white hover:text-[#800080] cursor-pointer transition-colors duration-100"
                >
                  {tab}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="hidden md:block lg:block pr-4">
        <div
          className="text-[3em] sm:text-[5em] font-extrabold text sm:"
          style={{ color: "#800080" }}
        >
          {tabData[selectedTab]}
        </div>

        <div
          className="h-[7px]   w-full mt-1"
          style={{ backgroundColor: "#800080" }}
        ></div>
      </div>
    </div>
  );
}
