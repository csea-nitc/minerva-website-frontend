"use client";
import React, { useEffect, useState } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";
import Modal from "../components/modal/Modal";
import YearCard from "../components/cards/YearCard";
import ListComp from "../components/newscomp/ListComp";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [dcc, setDcc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedYear(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backend_url}/api/dccs?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setDcc(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <ImageHero
        title="dcc"
        font={"60px"}
        mobileFont={"50px"}
        contentdiv={".content-div"}
      />


      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div className="sm:w-[65%] w-[85%] mx-auto py-10">

          {/* Title */}
          <div className="md:block lg:block">
            <div
              className="text-[3em] sm:text-[5em] font-extrabold text sm:"
              style={{ color: "#800080" }}
            >
              Minutes
            </div>
            <div
              className="h-[7px] w-full mt-1"
              style={{ backgroundColor: "#800080" }}
            ></div>
          </div>

          {  isLoading  &&  <Loading /> }
          
          <div className="grid justify-items-center ml-2 md:-ml-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6  mt-10 mx-auto">
            {dcc
              .sort((a, b) => parseInt(b.Title) - parseInt(a.Title))
              .map((stat) => (
              <div key={stat.id}>
                <YearCard
                  year={stat.Title}
                  onClick={() => handleYearClick(stat.Title)}
                />

                {/* Render Modal */}
                <Modal
                  open={isModalOpen && selectedYear === stat.Title}
                  onClose={handleCloseModal}
                >
                  <ListComp key={selectedYear} item={stat} flag={1} />
                </Modal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
