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
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsD = await fetch(`${backend_url}/api/news?populate[pdf][populate]=*&populate=image&sort[0]=createdAt:desc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newsData = await newsD.json();
        setNews(newsData.data ? newsData.data : []);
        setFilteredNews(newsData.data ? [...newsData.data] : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // Scroll to content when page changes
  useEffect(() => {
    if (!contentRef.current || currentPage === 1) return; 
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredNews(news);
      setCurrentPage(1);
      return;
    }

    const fuse = new Fuse(news, {
      keys: ["Title"],
      threshold: 0.4,
    });

    const results = fuse.search(searchTerm);
    setFilteredNews(results.map((result) => result.item));
    setCurrentPage(1);
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile
    
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
        title="NEWS"
        font={"80px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
        imgpath={"/dept.jpg"}
      />
      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div ref={contentRef} className="sm:w-[65%] w-[85%] mx-auto py-10">
          <SearchBar onSearch={handleSearch} blankOne="news" blankTwo="title" />
          {news && news.length > 0 ? (
            <>
              {filteredNews.length > 0 ? (
                <>
                  {currentNews.map((item) => (
                    <ListComp key={item.id || item.documentId} item={item} />
                  ))}
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Previous
                      </button>
                      
                      {getPageNumbers().map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-poppins text-sm sm:text-base transition-colors duration-200 flex items-center justify-center
                            ${currentPage === pageNum 
                              ? 'bg-accent text-white hover:bg-accent' 
                              : 'bg-gray-200 hover:bg-accent hover:text-white'}`}
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
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg bg-accent hover:bg-accent text-white font-poppins disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  No results found.
                </div>
              )}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}