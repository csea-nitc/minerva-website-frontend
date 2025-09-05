"use client";
import React, { useEffect, useState, useRef } from "react";
import ListComp from "../components/newscomp/ListComp";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";
import SearchBar from "../components/searchbar/SearchBar";
import Fuse from "fuse.js";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [awards, setAwards] = useState([]);
  const [filteredAwards, setFilteredAwards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const awardsD = await fetch(`${backend_url}/api/awards?populate[pdf][populate]=*&populate=image&sort[0]=createdAt:desc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const awardsData = await awardsD.json();
        setAwards(awardsData.data || []);
        setFilteredAwards(awardsData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredAwards(awards);
      setCurrentPage(1);
      return;
    }

    const fuse = new Fuse(awards, {
      keys: ["Title"],
      threshold: 0.2,
    });

    const results = fuse.search(searchTerm);
    setFilteredAwards(results.map((result) => result.item));
    setCurrentPage(1);

    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredAwards.length / itemsPerPage);
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; // Adjust visible page buttons for mobile screens

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

  const totalPages = Math.ceil(filteredAwards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredAwards.slice(startIndex, endIndex);

  return (
    <>
      <ImageHero
        title={"Awards"}
        font={"80px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
      />
      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div ref={contentRef} className="sm:w-[65%] w-[85%] mx-auto py-10">
          <SearchBar
            onSearch={handleSearch}
            blankOne="awards"
            blankTwo="title"
          />
          {awards && awards.length > 0 ? (
            <>
              {currentItems.map((item) => (
                <ListComp key={item.id} item={item} />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Previous
                  </button>
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-poppins text-sm sm:text-base transition-colors duration-200 flex items-center justify-center ${
                        currentPage === pageNum
                          ? "bg-accent text-white hover:bg-accent"
                          : "bg-gray-200 hover:bg-accent hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-poppins text-sm sm:text-base transition-colors duration-200 flex items-center justify-center
                                  bg-gray-200 text-black hover:bg-accent"
                  >
                    .....
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : filteredAwards.length === 0 ? (
            <div className="text-center text-gray-500 mt-8 mb-[10vh]">
              No results found.
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
