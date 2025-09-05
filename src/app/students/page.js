"use client";
import { useState, useEffect, useRef, use } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import YearCard from "../components/cards/YearCard";
import Modal from "../components/modal/Modal";
import ListComp from "../components/newscomp/ListComp";
import FacultyDetails from "../components/facultydetails/FacultyDetails";
import TabNav from "../components/tabnav/TabNav";
import Loading from "../components/loading/loading";

const backend_url = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

const tabData = [
  "B.Tech",
  "M.Tech-CSE",
  "M.Tech-CSE(IS)",
  "M.Tech-CSE(AIDA)",
  "PhD",
];

export default function Students() {
  const [studentData, setStudentData] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  // for faculty component
  const [activeIndex, setActiveIndex] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setModalOpen(true);
  };

  // close functionality  of modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedYear(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          "students-b-teches",
          "students-m-teches",
          "students-m-tes",
          "students-m-tech-aidas",
          "students-ph-ds",
        ];

        const requests = endpoints.map((endpoint) =>
          fetch(`${backend_url}/api/${endpoint}?populate=*&sort[0]=createdAt:desc`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => res.json())
        );

        const results = await Promise.all(requests);

        const data = results.map((result) =>
          result && result.data ? result.data : []
        );

        // Each index has the result of the corresponding fetch
        console.log(data);
        setStudentData(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <ImageHero
          title="Students"
          font={"100px"}
          mobileFont={"40px"}
          contentdiv={".content-div"}
          imgpath={"/grouppic.jpeg"}
        />
        
        <>
          <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
            <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>

            <div className="sm:w-[85%] w-[85%] mx-auto py-10">
              {/* Tab Navigation */}
              {isLoading ? (<Loading/>) : ( 
                <>
                  <TabNav onTabChange={setCurrentTab} tabData={tabData} />

                  {/* render faculty component for phD*/}
                  {currentTab === 4 ? (
                    studentData &&
                    studentData[currentTab] && (
                      <FacultyDetails
                        data={{
                          facultyData: studentData?.[currentTab] || [], // Ensure facultyData is always an array
                        }}
                        className={""}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                      />
                    )
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mx-auto p-4 sm:p-8 md:p-12 lg:px-0 lg:py-10">
                      {studentData &&
                        studentData[currentTab]
                          .sort((a, b) => parseInt(b.Title) - parseInt(a.Title)) // Sort by numeric value of Title
                          .map((student) => (
                            <div key={student.id}>
                              <YearCard
                                year={student.Title}
                                onClick={() => handleYearClick(student.Title)}
                              />

                              {/* Render Modal */}
                              <Modal
                                open={isModalOpen && selectedYear === student.Title}
                                onClose={handleCloseModal}
                              >
                                <ListComp key={selectedYear} item={student} />
                              </Modal>
                            </div>
                          ))}
                    </div>
                  )}
                </>)} 
            </div>
          </div>
        </>
      </div>
    </>
  );
}
