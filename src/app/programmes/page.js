"use client";
import { useState, useEffect } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import InfoSection from "../components/programmesutil/infosection";
import TabNav from "../components/tabnav/TabNav";

const TabData = ["B.Tech", "M.Tech-CSE", "M.Tech-CSE (IS)", "M.Tech-CSE (AIDA)", "PhD"];

const backendUrl = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

export default function Programmes() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allProgrammes, setAllProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/programmes-infos?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAllProgrammes(data.data);
      } catch (err) {
        console.error("Error fetching programmes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  const selectedTitle = TabData[selectedTab];
  const currentProgramme = allProgrammes.find(
    (entry) => entry.title === selectedTitle
  );

  return (
    <>
      <ImageHero
        title={"Programmes"}
        font={"80px"}
        mobileFont={"50px"}
        contentdiv={".content-div"}
        imgpath={"/view.jpg"}
      />
      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div className="max-w-6xl px-8 pr-3 mx-auto py-10">
          <TabNav onTabChange={setSelectedTab} tabData={TabData} />

          {loading ? (
            <p className="text-gray-400 mt-6">Loading...</p>
          ) : currentProgramme ? (
            <InfoSection
              title={currentProgramme.title}
              para1={currentProgramme.para1}
              para2={currentProgramme.para2}
              img1={
                currentProgramme.img1?.url
                  ? `${backendUrl}${currentProgramme.img1.url}`
                  : null
              }
              img2={
                currentProgramme.img2?.url
                  ? `${backendUrl}${currentProgramme.img2.url}`
                  : null
              }
            />
          ) : (
            <p className="text-red-500 mt-6">No data found for this programme.</p>
          )}
        </div>
      </div>
    </>
  );
}
