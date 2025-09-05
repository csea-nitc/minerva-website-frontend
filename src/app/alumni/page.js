"use client";
import React, { useEffect, useState, useRef } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import DistinguisedAlumni from "../components/distinguishedalumni/DistinguisehdAlumni";
import Loading from "../components/loading/loading";
import SearchBar from "../components/searchbar/SearchBar";
import Fuse from "fuse.js";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

export default function DistinguishedAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of cards per page
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backend_url}/api/distinguished-alumni?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const alumniData = data.data ? data.data : [];
        setAlumni(alumniData);
        setFilteredAlumni(alumniData);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!contentRef.current || currentPage === 1) return;
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredAlumni(alumni);
      setCurrentPage(1);
      return;
    }

    const fuse = new Fuse(alumni, {
      keys: ["Name", "Job"],
      threshold: 0.4,
    });

    const results = fuse.search(searchTerm);
    setFilteredAlumni(results.map((result) => result.item));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlumni = filteredAlumni.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        const offset = Math.floor(maxVisiblePages / 2);
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          pageNumbers.push(i);
        }
      }
    }
    return pageNumbers;
  };

  return (
    <>
      <ImageHero
        title="Distinguished Alumni"
        font={"70px"}
        mobileFont={"55px"}
        contentdiv={".content-div"}
      />
      <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute top-0"></div>
        <div ref={contentRef} className="max-w-6xl mx-auto py-10">
          <SearchBar
            onSearch={handleSearch}
            blankOne="alumni"
            blankTwo="name or job title"
          />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {filteredAlumni.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 gap-x-8 sm:px-10">
                    {currentAlumni.map((person) => (
                      <DistinguisedAlumni
                        key={person.id}
                        picture={
                          person.image && person.image.url
                            ? `${backend_url}${person.image.url}`
                            : "/pfp.jpg"
                        }
                        program={"Program Info"} // Replace with actual program if available
                        year={person.createdAt.slice(0, 4)}
                        name={person.Name}
                        line1={person.Job}
                        line2={""} // Add more information if needed
                        url={person.External_Links}
                      />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Previous
                      </button>

                      {getPageNumbers().map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-poppins
                          text-sm sm:text-base transition-colors duration-200 flex items-center justify-center
                            ${
                              currentPage === pageNum
                                ? "bg-accent text-white"
                                : "bg-gray-200 hover:bg-accent hover:text-white"
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  No alumni found.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
