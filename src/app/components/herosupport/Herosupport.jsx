"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./squigglyLine.module.css";

const Herosupport = ({ props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // fetching latest announcements
  const [data, setData] = useState([]);
  const [link, setLinks] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [ isLinkLoading , setIsLinkLoading ] = useState( true ); 

  const token = process.env.NEXT_PUBLIC_TOKEN;
  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const announcementsRes = await fetch(
          `${backend_url}/api/announcements?sort[0]=createdAt:desc&pagination[pageSize]=3`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const announcementsData = await announcementsRes.json();
        setData(announcementsData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    // Fetch data for quick links
    const fetchData = async () => {
      try {
        const linksD = await fetch(
          `${backend_url}/api/quick-links?sort[0]=createdAt:desc&populate[pdf][populate]=*&populate=image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const linksData = await linksD.json();
        setLinks(linksData.data ? linksData.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLinkLoading( false ) ; 
      }
    };

    fetchData();
    fetchLatestData();
  }, []);

 
  return (
    <div className="relative mt-[90vh] z-10">
      <div className="w-[100%] mt-[15vh]">
        <div
          className={`w-full h-[20vh] relative z-10 bottom-[6.5vh] md:translate-y-3 ${styles.topSquiggly}`}
        />

        <div className="w-full bg-accent flex flex-col items-center justify-center">
          <div className="w-[100%] bg-accent justify-center flex flex-col gap-2 md:flex-row relative z-10 bottom-[12vh] mb-[-15vh] mt-3 md:mt-10 md:pl-[10%] ">

            {/* latest section */}
            <div className="flex flex-col font-jakarta lg:mt-10 justify-between md:h-[80%] md:mb-10 m-5 mb-1 md:w-[50%]">
              <div className="mb-2 w-[100%] text-4xl text-white font-jakarta font-bold">
                Latest
              </div>
              {isDataLoading ? (
                <div className="flex items-center justify-center gap-3 py-8">
                <div className="h-10 w-10 rounded-full border-4 border-l-gray-200 border-t-accent animate-spin" />
                </div>
              ) : (
                data.map((item) => (
                  <a
                    key={item.id}
                    href={`/announcements/${item.documentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-lg lg:text-2xl pr-3 py-1 text-wrap text-justify break-words lg:w-[600px] flex items-center underline hover:underline-offset-4 hover:text-purple-300 h-full"
                  >
                    {item.Title}
                  </a>
                ))
              )}
            </div>
            
            {/* Vertical line */}
            <div className="hidden md:flex items-stretch">
              <div className="w-[1.5px] bg-white h-[90%]"></div>
            </div>
            
            {/* Quick-links */}
            <div className="flex flex-col font-jakarta lg:mt-10 justify-between md:h-[80%] md:mb-10 md:ml-[5%] md:w-[40%] m-5 mb-10">
              <div className="mb-2 w-[100%] text-4xl text-white font-jakarta font-bold ">
                Quick-Links
              </div>
              {isLinkLoading ? (
                <div className="flex items-center justify-center gap-3 py-8">
                <div className="h-10 w-10 rounded-full border-4 border-l-gray-200 border-t-accent animate-spin" />
                </div>
              ) : (
                <div>
                {
                  link.map((item) => (
                    <a
                      key={item.id}
                      href={`/node/${item.documentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-lg lg:text-2xl pr-3 py-1 text-wrap text-justify break-words lg:w-[600px] flex items-center underline hover:underline-offset-4 hover:text-purple-300 h-full"
                    >
                      {item.Title}
                    </a>
                  ))
                }
                <a href="/dcc" className="text-white text-lg lg:text-2xl pr-3 py-1 text-wrap text-justify break-words lg:w-[600px] flex items-center underline hover:underline-offset-4 hover:text-purple-300 h-full">DCC Minutes</a>
                </div>
              )}
            </div>

          </div>

          <div
            className={`hidden md:flex border-l-[10px] border-[#800080] w-full h-[10vh] absolute z-10 ${styles.bottomSquiggly} relative overflow-hidden`}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Herosupport;
