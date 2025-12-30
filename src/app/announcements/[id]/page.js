"use client";

import React, { useEffect, useState } from "react";
import ListComp from "../../components/newscomp/ListComp";
import ImageHero from "../../components/imagehero/Imagehero";
import Loading from "../../components/loading/loading";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

export default function post({ params: promiseParams }) {
  const params = React.use(promiseParams);
  const { id } = params;
  const Id = decodeURIComponent(id);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${backend_url}/api/announcements/${id}?populate[pdf][populate]=*&populate=image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const Data = await data.json();
        setData(Data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ImageHero
        title={data?.Title || "Loading"}
        font={"50px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
      />
      {data ? (
        <>
          <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
            <div className="sm:w-[65%] w-[85%] mx-auto">
              <ListComp key={data.id} item={data} />
            </div>
          </div>
        </>
      ) : (
        <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
          <div className="sm:w-[65%] w-[85%] mx-auto">
            <Loading />{" "}
          </div>
        </div>
      )}
    </>
  );
}
