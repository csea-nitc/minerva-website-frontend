"use client";
import ImageHero from "../components/imagehero/Imagehero";
import Graph from "../components/graph/Graph";
import ListComp from "../components/newscomp/ListComp";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import TabNav from "../components/tabnav/TabNav";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

const tabData = ["B.Tech", "M.Tech-CSE", "M.Tech-CSE (IS)", "MCA"];

export default function Placements() {
  const [placements, setPlacements] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching both endpoints
        const [placementD, statsD] = await Promise.all([
          fetch(`${backend_url}/api/placements?populate=*`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${backend_url}/api/placement-stats`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const placementData = await placementD.json();
        const statsData = await statsD.json();

        const graphData = statsData.data.map((item) => ({
          year: item.year,
          placed: item.percentage,
        }));

        setStats(graphData);
        setPlacements(placementData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <ImageHero
          title="PLACEMENTS"
          font={"80px"}
          mobileFont={"40px"}
          contentdiv={".content-div"}
          imgpath={"/ccd.jpg"}
        />

        <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
          <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
          <div className="sm:w-[65%] w-[85%] mx-auto py-10">
            {/* Tab Navigation */}
            <TabNav onTabChange={setSelectedTab} tabData={tabData} />

            {/* Graph comp rendered only for B.Tech stats */}
            {selectedTab === 0 && (
              <div className="flex items-center justify-center  p-4">
                <Graph data={stats} />
              </div>
            )}

            {/* MarkdowTable */}
            <div className="py-5 m-auto">
              {placements && placements.length > 0 ? (
                <ListComp
                  key={selectedTab}
                  item={{ ...placements[selectedTab], Title: "" }}
                />
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
