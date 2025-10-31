"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchBar from "../searchbar/SearchBar";
import Fuse from "fuse.js";

export default function FacultyDetails({
  data,
  className,
  activeIndex,
  setActiveIndex,
  isHodInfoVisible,
}) {
  const backend_url = process.env.NEXT_PUBLIC_API_URL;
  // const [activeIndex, setActiveIndex] = useState(null);
  console.log(data.facultyData);
  let [cols, setCols] = useState(1);
  const containerRef = useRef(null);
  const { facultyData } = data;
  const [filteredFacultyData, setFilteredFacultyData] = useState(facultyData);

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width >= 1536) setCols(5); // 2xl:grid-cols-5
      else if (width >= 1152) setCols(4); // lg-xl:grid-cols-4
      else if (width >= 768) setCols(3); // md:grid-cols-3
      else setCols(1); // grid-cols-1
    };

    updateCols();
    window.addEventListener("resize", updateCols);

    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredFacultyData(facultyData);
      return;
    }

    const fuse = new Fuse(facultyData, {
      keys: ["name"],
      threshold: 0.25,
    });

    const results = fuse.search(searchTerm);
    setFilteredFacultyData(results.map((result) => result.item));
    // console.log(filteredFacultyData);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <>
      <SearchBar onSearch={handleSearch} blankOne="faculty" blankTwo="name" />{" "}
      {filteredFacultyData.length > 0 ? (
        <div
          className={`font-jakarta mx-auto py-4 flex justify-center items-center ${className}`}
          ref={containerRef}
        >
          <div
            className={`grid gap-2 w-full grid-cols-1 md:grid-cols-3 ${
              cols === 4 && "lg-xl:grid-cols-4"
            } 2xl:grid-cols-5`}
          >
            {filteredFacultyData.map((faculty, index) => (
              <React.Fragment key={index}>
                {/* Image */}
                <div
                  className={`mx-auto relative overflow-hidden w-fit rounded-xl group hover:cursor-pointer ${
                    activeIndex !== null && activeIndex !== index
                      ? "blur-[2px]"
                      : "blur-none"
                  } `}
                  onClick={() => handleToggle(index)}
                >
                  <div>
                    <img
                      src={
                        faculty.photograph ? (`${backend_url}${faculty?.photograph?.url}`) : "./pfp.jpg"}
                      // src={faculty.image}
                      alt=""
                      className="lg:w-[250px] lg:h-[300 px] w-[250px] h-[300px] object-cover group-hover:scale-[1.04] duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full">
                    <div
                      className={`px-4 py-2 m-2 ${
                        isHodInfoVisible
                          ? "bg-white/90 text-black"
                          : activeIndex === null
                          ? "bg-[#800080]/80 text-white"
                          : activeIndex === index
                          ? "bg-[#800080]/80 text-white"
                          : "bg-white/90 text-black"
                      } transition-all duration-200 rounded-md flex flex-col items-center`}
                    >
                      <p className="font-semibold font-jakarta text-lg">
                        {faculty.name}
                      </p>
                      {faculty.designation && (
                        <p className="font-jakarta text-lg  ">
                          {faculty.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Render details row below the current set of cards */}
                {activeIndex !== null &&
                  Math.floor(activeIndex / cols) === Math.floor(index / cols) &&
                  (index % cols === cols - 1 ||
                    index === filteredFacultyData.length - 1) && (
                    <div
                      className={`col-span-full col-start-${
                        (index % cols) + 1
                      } overflow-hidden rounded-lg transition-all duration-500 ease-in-out`}
                    >
                      <div className="flex flex-wrap bg-gray-100 mt-4 rounded-lg">
                        <div className="fac-det-name bg-[#800080] flex flex-col rounded-tr-lg md-lg:rounded-tr-none rounded-tl-lg justify-evenly items-center text-center md-lg:w-[28.5%] w-full">
                          <h1 className="text-white lg-xl:text-[2.5rem] md:text-[1.5rem] text-[1.2rem] font-bold px-1">
                            {filteredFacultyData[activeIndex].name}
                          </h1>
                          <h2 className="text-white lg-xl:text-[1.5rem] md:text-[1.2rem] text-[1rem]">
                            {filteredFacultyData[activeIndex].designation}
                          </h2>
                        </div>
                        <div className="fac-det-details bg-[#d9d9d9] text-black md-lg:w-[71.5%] w-full font-bold rounded-lg md-lg:rounded-tl-none md-lg:rounded-bl-none rounded-tl-none rounded-tr-none md-lg:rounded-tr-lg">
                          <ul className="text-[0.7rem] md:text-[0.85rem] lg:text-[0.95rem] p-0">
                            {filteredFacultyData[activeIndex].contact_email && (
                              <li className="m-4">
                                Email:
                                <span> </span>
                                <Link
                                  href={`mailto:${filteredFacultyData[activeIndex].contact_email}`}
                                  className="text-purple-600 underline hover:text-purple-800"
                                >
                                  {
                                    filteredFacultyData[activeIndex]
                                      .contact_email
                                  }{" "}
                                </Link>
                              </li>
                            )}
                            {filteredFacultyData[activeIndex]
                              .office_location && (
                              <li className="m-4">
                                Office Location:{" "}
                                {
                                  filteredFacultyData[activeIndex]
                                    .office_location
                                }
                              </li>
                            )}
                            {filteredFacultyData[activeIndex].contact_no && (
                              <li className="m-4">
                                Office Contact:{" "}
                                {filteredFacultyData[activeIndex].contact_no}
                              </li>
                            )}
                            {filteredFacultyData[activeIndex].education && (
                              <li className="m-4 mb-3">
                                Education:
                                <ul  className="px-8">
                                  {filteredFacultyData[activeIndex].education.split("~").map((item, index) => (
                                    <li key={index} className="mb-3">{item} </li>
                                  ))}
                                </ul>
                              </li>
                            )}
                            {filteredFacultyData[activeIndex]
                              .specialisation && (
                              <li className="m-4">
                                Specialisation:{" "}
                                {
                                  filteredFacultyData[activeIndex]
                                    .specialisation
                                }
                              </li>
                            )}
                            {filteredFacultyData[activeIndex]
                              .associated_frgs && (
                              <li className="m-4">
                                Associated FRGs:{" "}
                                {
                                  filteredFacultyData[activeIndex]
                                    .associated_frgs
                                }
                              </li>
                            )}

                            {filteredFacultyData[activeIndex].external_links && (
                              <ul className="m-4">
                                <span className="font-semibold">External Links:</span>
                                {filteredFacultyData[activeIndex].external_links.split(",").map((entry, index) => {
                                  const [text, url] = entry.includes("|") ? entry.split("|") : ["", entry.trim()];
                                  
                                  // Extract domain name if no text is provided
                                  const domain = url.replace(/https?:\/\/(www\.)?/, "").split("/")[0];

                                  return (
                                    <li key={index} className="px-8 mb-3">
                                      <Link 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-purple-600 underline hover:text-purple-800"
                                      >
                                        {text.trim() || domain || `External Link ${index + 1}`}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}

                            {filteredFacultyData[activeIndex].additional_info && (
                              <ul className="m-4">
                                <span className="font-semibold">Additional Info:</span>
                                {filteredFacultyData[activeIndex].additional_info.split("~").map((item, index) => {

                                  // A regular expression to find URLs (http, https)
                                  const urlRegex = /(https?:\/\/[^\s]+)/g;

                                  // Split the item string into an array of text and links
                                  const parts = item.split(urlRegex);
                                  
                                  return (
                                    <li className="px-8 mb-3" key={index}>
                                      {parts.map((part, i) =>
                                        // Check if the current part is a URL
                                        part.match(urlRegex) ? (
                                          // If it's a URL, render a clickable link
                                          <a
                                            href={part}
                                            key={i}
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-purple-600 underline hover:text-purple-800"
                                          >
                                            {part}
                                          </a>
                                        ) : (
                                          // Otherwise, just render it as plain text
                                          <span key={i}>{part}</span>
                                        )
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}

                            {filteredFacultyData[activeIndex]
                              .institute_page && (
                              <ul className="m-4">
                      
                                <li >
                                  <Link
                                    href={
                                      filteredFacultyData[activeIndex]
                                        .institute_page
                                    }
                                    className="text-purple-600 underline hover:text-purple-800"
                                  >
                                    Visit Homepage
                                  </Link>
                                </li> 
                              </ul>
                            )}

                            {filteredFacultyData[activeIndex]
                              .year_of_admission && (
                              <li className="m-4">
                                Year of Admission:{" "}
                                {
                                  filteredFacultyData[activeIndex]
                                    .year_of_admission
                                }
                              </li>
                            )}

                            {filteredFacultyData[activeIndex]
                              .areas_of_interest && (
                              <li className="m-4">
                                Areas of Interest:{" "}
                                {
                                  filteredFacultyData[activeIndex]
                                    .areas_of_interest
                                }
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-2xl mt-8 h-[18vw]">
          No results found.
        </div>
      )}
    </>
  );
}
