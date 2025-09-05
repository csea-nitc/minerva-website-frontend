"use client";
import React, { useEffect, useState, useRef } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";
import PDF from "../components/pdf/PDF";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [downloads, setDownloads] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backend_url}/api/download?populate[pdf][populate]=*&populate&sort[0]=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const downloadsData = data.data ? data.data : [];
        setDownloads(downloadsData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);




  return (
    <>
      <ImageHero
        title="DOWNLOADS"
        font={"80px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
        imgpath={"/activities.jpeg"}
      />
      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div className="w-full flex justify-center items-center flex-col">
          <div
            className="text-[3em] sm:text-[5em] w-[60%] font-extrabold text pl-0 ml-0 mt-5"
            style={{ color: "#800080" }}
            >
            Download Forms
          </div>
          <div className="h-[7px] w-[60%] mt-1" style={{backgroundColor: "rgb(128, 0, 128)"}}></div>
        </div>
        <div ref={contentRef} className="sm:w-[60%] w-[85%] mx-auto py-10">
          {downloads?.pdf ? (
            downloads.pdf.length > 0 ? (
              downloads.pdf.map((pdfItem) => (
                <div key={pdfItem.id} className="mb-7">
                  <PDF 
                    title={pdfItem.Name} 
                    url={`${backend_url}${pdfItem.pdf.url}`} 
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-8">No PDFs available.</div>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}