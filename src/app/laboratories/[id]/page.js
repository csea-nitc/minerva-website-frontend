"use client";

import React, { useEffect, useState } from "react";
import ListComp from "../../components/newscomp/ListComp";
import ImageHero from "../../components/imagehero/Imagehero";
import Loading from "../../components/loading/loading";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

// function to render paragragh

const renderContent = (content) => {
  return content.map((item, index) => {
    switch (item.type) {
      case 'heading':
        return (
          <div key={index} className="pb-2 px-4 mb-2">
            {React.createElement(
              `h${item.level}`,
              {
                className:
                  'text-accent font-jakarta text-2xl sm:text-4xl md:text-5xl font-bold flex justify-left items-center',
              },
              item.children.map((child, i) =>
                child.bold ? <b key={i} className="text-accent">{child.text}</b> : child.text
              )
            )}
          </div>
        );
      case 'paragraph':
        return (
          <div key={index} className="pb-2 px-4 mb-2">
            <p className="font-jakarta sm:text-2xl md:text-2xl my-2">
              {item.children.map((child, i) => {
                if (child.type === 'text') {
                  return child.bold ? (
                    <b key={i} className="text-accent">{child.text}</b>
                  ) : (
                    child.text
                  );
                } else if (child.type === 'link') {
                  return (
                    <a
                      key={i}
                      href={child.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold"
                    >
                      {child.children.map((linkText, j) => linkText.text)}
                    </a>
                  );
                }
                return null;
              })}
            </p>
          </div>
        );
      case 'list':
        return (
          <div key={index} className="pb-2 px-10">
            <ul className="list-disc ml-8 font-jakarta sm:text-lg md:text-xl">
              {item.children.map((listItem, i) => (
                <li key={i} className="my-2">
                  {listItem.children.map((child, j) =>
                    child.bold ? <b key={j} className="text-accent">{child.text}</b> : child.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  });
};


export default function post({ params: promiseParams }) {
  const params = React.use(promiseParams);
  const { id } = params;
  const Id = decodeURIComponent(id);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `${backend_url}/api/labs/${Id}`,
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
        title={data?.name || "Loading"}
        font={"60px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
        imgpath="/ssl.jpg"
      />
      {data ? (
        <>
          <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white pb-10">
            <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
            <div className="sm:w-[75%] w-[85%] mx-auto">
            <div className="pt-10">{ renderContent( data.description ) }</div>
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
