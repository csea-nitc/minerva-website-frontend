"use client";

const bankDetails = require("./bankDetails.json");
const studentRepresentatives = require("./studentRepresentatives.json");
import ImageHero from "../components/imagehero/Imagehero";
import { useState, useEffect } from "react";
import Loading from "../components/loading/loading";

export default function ESSFPage() {
    const [rep_4th, SetRep_4th] = useState([]);
    const [rep_3rd, SetRep_3rd] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading status

    const token = process.env.NEXT_PUBLIC_TOKEN;
    const backend_url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(`${backend_url}/api/essf-4th-year`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${backend_url}/api/essf-3rd-year`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

                SetRep_4th(data1?.data || []);
                SetRep_3rd(data2?.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setIsLoading(false); // Set loading to false after data fetch
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <ImageHero
                title={"Emergency Student Support Fund"}
                font={"60px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
                increasedHeight={1}
                imgpath={"/essf.jpeg"}
            />

            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                    {isLoading ? (
                        <Loading /> // Loading inside the content wrapper
                    ) : (
                        <div className="font-jakarta pt-6 pb-6">
                            <h2 className="md:text-2xl font-bold text-[#800080]">
                                What is ESSF?
                            </h2>
                            <p className="md:text-lg pt-2">
                                ESSF(Emergency Student Support Fund) aims to support the monetary needs of <b>full-time B.Tech CSE students</b> who are currently on rolls. The funds are provided as a loan without any interest, without accepting any collateral or guarantee of repayment.
                            </p>
                            <h2 className="md:text-2xl pt-6 font-bold text-[#800080]">
                                How to apply for ESSF?
                            </h2>
                            <div className="md:text-lg pt-2">
                                Any full-time B.Tech CSE student of NITC in need of funds is requested to contact the following student representatives:
                                <div className="pt-6 pb-6">
                                    <div key={rep_4th.email}>
                                        <p>{rep_4th.name}</p>
                                        <a href={"mailto:" + rep_4th.email} className="text-[#800080] underline">
                                            {rep_4th.email}
                                        </a>
                                        <p>Fourth-Year B Tech Representative</p>
                                    </div>
                                </div>
                                <div className="pt-6 pb-6">
                                    <div key={rep_3rd.email}>
                                        <p>{rep_3rd.name}</p>
                                        <a href={"mailto:" + rep_3rd.email} className="text-[#800080] underline">
                                            {rep_3rd.email}
                                        </a>
                                        <p>Third-Year B Tech Representative</p>
                                    </div>
                                </div>
                            </div>
                            <h2 className="md:text-2xl pt-6 font-bold text-[#800080]">
                                How to contribute/repay?
                            </h2>
                            <p className="md:text-lg pt-2">
                                The funds will be sent and repaid by online banking transactions. If you wish to repay the loan / contribute to this fund, online transfers may be made to the following account.
                            </p>
                            <div className="pt-6 pb-6">
                                {bankDetails.map((bankDetail) => (
                                    <div key={bankDetail.name} className="pt-2 pb-2">
                                        <p>A/c No: {bankDetail.accNo}</p>
                                        <p>Name: {bankDetail.name}</p>
                                        <p>Branch: {bankDetail.branch}</p>
                                        <p>IFSC: {bankDetail.ifsc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
