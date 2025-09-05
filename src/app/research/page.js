"use client";
import tabData from "./data";
import { useState, useEffect } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import TabNav from "../components/tabnav/TabNav";
import Link from "next/link";
import ListComp from "../components/newscomp/ListComp";
import Loading from "../components/loading/loading";

const TabData = ["Areas Of Research", "Research Groups", "Completed PhDs"];

const backend_url = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

export default function Programmes() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // New state for loading
    const [issmall, setIsSmall] = useState(false);

    useEffect(() => {
        const checkSmall = () => {
            setIsSmall(window.innerWidth < 896);
        };
        checkSmall();
        window.addEventListener("resize", checkSmall);
        return () => window.removeEventListener("resize", checkSmall);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backend_url}/api/completed-ph-d`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const Data = await response.json();
                setData(Data.data ? Data.data : []);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false); // Set loading to false after fetching data
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <ImageHero
                title={"Research"}
                font={"80px"}
                mobileFont={"50px"}
                contentdiv={".content-div"}
            />
            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                    {/* Tab Navigation */}
                    {isLoading ? (
                        <Loading /> // Show loading component if data is still loading
                    ) : (
                        <>
                            <TabNav
                                tabData={TabData}
                                onTabChange={setSelectedTab}
                            />
                            <div className="flex flex-col max-1240:pr-[2vw] mb-[10vh]">
                                {/* Content Rendering */}
                                <div className="font-jakarta mt-12">
                                    {TabData[selectedTab] ===
                                    "Areas Of Research" ? (
                                        // Content for Areas Of Research
                                        <div>
                                            {tabData[selectedTab].titlesAndAreas.map(
                                                (item, index) => (
                                                    <div key={index} className="mb-6">
                                                        <h3 className="text-2xl font-bold text-[#800080]">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[1.2em] text-gray-700">
                                                            {item.area}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : TabData[selectedTab] ===
                                      "Research Groups" ? (
                                        // Content for Research Groups
                                        <div>
                                            <p className="text-[1.6em] leading-[35px] text-justify">
                                                Following are the upcoming research
                                                groups in the Department:
                                            </p>
                                            <ul className="mt-4 list-disc pl-8 text-[1.6em] text-gray-700">
                                                {tabData[selectedTab].groups.map(
                                                    (group, index) => (
                                                        <li key={index} className="mb-2">
                                                            {group.link ? (
                                                                <Link
                                                                    href={group.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[#800080] hover:underline"
                                                                >
                                                                    {group.name}
                                                                </Link>
                                                            ) : (
                                                                <span>{group.name}</span>
                                                            )}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ) : (
                                        // Content for Completed PhDs
                                        <div>
                                            <ListComp item={data} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
