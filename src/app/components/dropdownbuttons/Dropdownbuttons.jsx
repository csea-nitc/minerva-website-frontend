import { useState } from "react";

function DropdownButtons({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(-1);

  const tabData = ["Curriculum", "Syllabi", "Ordinances and Regulations", "Outcomes"];
  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  const handleButtonClick = (index) => {
    if (activeButton === index) {
      setActiveButton(-1); 
    } else {
      setActiveButton(index);
    }
  };

  return (
    <div className="sm:px-0 font-jakarta">
      {/* Desktop View */}
      <div
        className="hidden sm:flex relative z-0 justify-between mt-5"
        style={{ borderColor: "#800080", borderWidth: "3px", borderRightWidth: "0" }}
      >
        {tabData.map((button, index) => (
          <div
            key={button}
            onClick={() => handleButtonClick(index)} 
            className={`flex flex-1 items-center font-bold justify-center py-2 border-r-[3px] transition-all cursor-pointer ${
              activeButton === index
                ? "bg-[#800080] text-white"
                : "text-[#800080]"
            } hover:bg-[#800080] hover:text-white`}
            style={{ borderColor: "#800080" }}
          >
            <span className="sm:px-6 text-[1.3em] sm:text-[1.5em] rounded uppercase text-center">
              {button}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-col items-center w-full mt-5 px-4">
        <div className="relative w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? "true" : "false"}
            className="w-[100%] flex justify-between items-center px-4 py-2 text-[1.5em] font-extrabold text-white bg-[#800080]"
          >
            {/* Display "Select" if no button is active */}
            <span className={`${isOpen ? "text-white" : "text-white"}`}>
              {activeButton === -1 ? "Select" : tabData[activeButton]}
            </span>

            <svg
              className={`w-6 h-6 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-white" : "text-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
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
            <ul className="z-10 w-full mt-2 mb-4 bg-[#800080]">
              {tabData.map((button, index) => (
                <li
                  key={button}
                  onClick={() => {
                    setActiveButton(index);
                    setIsOpen(false); 
                  }}
                  className={`px-4 py-2 text-white hover:bg-white hover:text-[#800080] cursor-pointer transition-colors duration-100 ${
                    activeButton === index ? "bg-purple-300 text-purple-800" : ""
                  }`}
                >
                  {button}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Dropdown Content */}
      <div className="px-4 sm:px-0 mt-5 sm:mt-0 text-sm sm:text-lg">
        {tabData.map((button, index) => (
          <div
            key={button} 
            className={`shadow-lg relative transition-all sm:rounded-none duration-400 overflow-hidden ${
              activeButton === index ? "h-auto opacity-100" : "max-h-0 py-0 opacity-0"
            }`}
            style={{ backgroundColor: "#800080" }}
          >
            <ul className="p-2 rounded-xl">
            {data[index]?.pdf

              /*
                Sorting pdfs based on extracted year - Highly dependant on naming pdf at backend , more reliable than sorting by created AT since pdfs can be added orremoved by mistake easily. This way any naming format can be changed in backend to carter to front-end sort.
              */

              .sort((a, b) => {
                const extractYear = (name) => {
                  const match = name.match(/\d{4}/); // Extracts a 4-digit year
                  return match ? parseInt(match[0]) : Infinity; // Default to a high value if no year is found
                };
                return extractYear(b.Name) - extractYear(a.Name); // Sort in descending order order
              })
              .map((item) => (
                <li key={`${item.pdf.documentId}-${index}`} className="px-4 py-2 text-white text-[1.2em]">
                  <a href={`${backend_url}/${item.pdf.url}`} target="_blank" rel="noopener noreferrer">
                    {item.Name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownButtons;
