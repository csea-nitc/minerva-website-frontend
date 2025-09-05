"use client";
import React from "react";
import Card from "../components/lab_card/card.jsx";
import ImgCard from "../components/imagehero/Imagehero.jsx";
import { useState, useEffect } from "react";
import Loading from "../components/loading/loading";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

const page = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`${backend_url}/api/labs?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const Data = await data.json();

                setData(Data.data);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };
        fetchData();
    }, []);

    const images =
        data &&
        data.map((item) => ({
            img: `${backend_url}${item.image.url}`,
            tag: item.name,
        }));

    return (
        <>
            <ImgCard
                title={"Laboratories"}
                font={"80px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
                imgpath="/labsalt.jpeg"
            />
            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                <div className="grid grid-cols-1">
                    {data && data.map((item) => ( 
                        <Card
                            key={item.id}
                            title={item.name || "-"}
                            id={item.documentId || "-"}
                            faculty={item.faculty || "-"}
                            staff={item.staff || "-"}
                            location={item.location || "-"}
                        />
                    ))}
                </div>
                </div>
            </div>
        </>
    );
};

export default page;
