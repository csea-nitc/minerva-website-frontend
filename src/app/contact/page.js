"use client";
const hodDetails = require("./hodDetails.json");
import { useState, useEffect } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";

const backend_url = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.NEXT_PUBLIC_TOKEN;

export default function ContactUsPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`${backend_url}/api/hod`, {
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
    return (
        <>
            <ImageHero
                title={"Contact Us"}
                font={"100px"}
                mobileFont={"30px"}
                contentdiv={".content-div"}
                imgpath={"/contact.jpeg"}
            />
            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                    {data ? (
                        <div className="font-jakarta pt-6 pb-6">
                            <h2 className="md:text-2xl font-bold">
                                Office Address:
                            </h2>
                            <p className="md:text-lg pt-6">
                                Department of Computer Science and Engineering, <br />
                                National Institute of Technology Calicut,<br /> 
                                NIT Campus PO<br />
                                Kerala - 673 601, India{" "}
                                <br />
                                Phone: +91 495 2286800
                            </p>
                            <h2 className="md:text-2xl pt-6 font-bold">
                                Office Working Hours:
                            </h2>
                            <p className="md:text-lg pt-2">
                                9 AM to 5.50 PM, Mondays through Fridays
                            </p>
                            <h2 className="md:text-2xl pt-6 font-bold">
                                Head of the Department:
                            </h2>
                            <p className="md:text-lg pt-2">
                                <a
                                    href="https://minerva.nitc.ac.in/faculty"
                                    target="_blank"
                                    className="text-purple-600 underline hover:text-purple-800"
                                >
                                    {data?.name}
                                </a>
                                <br />
                                <strong>Email ID:</strong>{" "}
                                <a
                                    href="mailto:hodcsed@nitc.ac.in"
                                    className="text-purple-600 underline hover:text-purple-800"
                                >
                                    hodcsed@nitc.ac.in
                                </a>
                            </p>
                        </div>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </>
    );
}
