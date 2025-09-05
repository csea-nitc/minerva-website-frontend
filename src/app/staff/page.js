"use client";
import { useState, useEffect } from "react";
import FacultyDetails from "../components/facultydetails/FacultyDetails";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";

export default function Home() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [staffData, setStaffData] = useState([]);

    const backend_url = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_TOKEN;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${backend_url}/api/staffs?populate=photograph`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);

                if (result && result.data && Array.isArray(result.data)) {
                    // Sorting staffData alphabetically by name
                    const sortedData = result.data.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        return nameA.localeCompare(nameB);
                    });
                    setStaffData(sortedData);
                } else {
                    console.error("Data structure is unexpected:", result);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ImageHero
                title={"Staff"}
                font={"80px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
                imgpath={"/ssl.jpg"}
            />
            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[75%] w-[85%] mx-auto py-4 md:py-16">
                    {staffData && staffData.length > 0 ? (
                        <>
                            <h2 className="  font-saira font-extrabold ">
                                <span
                                    style={{
                                        color: "#800080",
                                        fontSize: `clamp(15px, 10vw, 90px)`,
                                    }}
                                >
                                    STAFF
                                </span>
                            </h2>
                            <FacultyDetails
                                data={{ facultyData: staffData }}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}
