"use client";

import React, { useEffect, useState } from "react";
import ListComp from "../../components/newscomp/ListComp";
import ImageHero from "../../components/imagehero/Imagehero";
import Loading from "../../components/loading/loading";

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;
 
export default function Home( { params : promiseParams } ) {
    const params = React.use(promiseParams); 
    const { slug } = params; 
    const Slug = decodeURIComponent( slug );

    console.log( slug ) 

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(
                    `${backend_url}/api/quick-links/${Slug}?populate[pdf][populate]=*&populate=image`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const Data = await data.json();
                setData( Data.data ? Data.data : [] );
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <ImageHero
                title= {`${data.Title}`}
                font={"80px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
            />
            <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="sm:w-[65%] w-[85%] mx-auto">
                    {data ? (
                        <ListComp item={data} />
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
}