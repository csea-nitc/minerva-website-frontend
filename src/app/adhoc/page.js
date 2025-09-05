"use client";
import { useState, useEffect } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import ListComp from "../components/newscomp/ListComp";
import Loading from "../components/loading/loading";
import TabNav from "../components/tabnav/TabNav";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

const tabData = ["Adhoc staff", "Adhoc Technical staff"];

export default function Adhoc() {
  const [adhoc, setAdhoc] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adhocD = await fetch(`${backend_url}/api/adhocs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adhocData = await adhocD.json();
        setAdhoc(adhocData.data ? adhocData.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ImageHero
        title={"Adhoc"}
        font={"80px"}
        mobileFont={"50px"}
        contentdiv={".content-div"}
      />
      <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
        <div className="sm:w-[65%] w-[85%] mx-auto py-10">

          {/* Tab Navigation */}
          <TabNav onTabChange={setSelectedTab} tabData= {tabData} />

          <div >
            {adhoc && adhoc.length > 0 ? (
              <ListComp
                key={selectedTab}
                item={{ ...adhoc[selectedTab], Title: "" }}
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
