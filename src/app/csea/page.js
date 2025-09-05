'use client'
import { useEffect, useState } from "react";
import ImageHero from "../components/imagehero/Imagehero";
import Loading from "../components/loading/loading";
import ListComp from "../components/newscomp/ListComp";

export default function CSEAPage() {
    const token = process.env.NEXT_PUBLIC_TOKEN;
    const backend_url = process.env.NEXT_PUBLIC_API_URL;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${backend_url}api/cseas?populate[pdf][populate]=*&populate=image`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const Data = await response.json();
                setData(Data.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <ImageHero
                title={"Computer Science and Engineering Association"}
                font={"50px"}
                mobileFont={"30px"}
                contentdiv={".content-div"}
                increasedHeight={1}
                imgpath={"/csea.jpeg"}
            />
            <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                    <p className="md:text-lg pt-6 font-jakarta">
                        The Computer Science and Engineering Association (CSEA)
                        is an integral part of the Computer Science and
                        Engineering Department. Over the years, CSEA has
                        encouraged the academic and scientific development of
                        the department's student body through activities such as
                        coding competitions, technical workshops and talks by
                        eminent researchers. Annually, the CSEA hosts Code
                        Maestros, Technical workshops, Linux Fest, FOSSMeet and
                        job/internship talks.
                    </p>
                    <p className="md:text-lg pt-6 mb-10">
                        <strong>Homepage: </strong>{" "}
                        <a
                            href="http://assoc.cse.nitc.ac.in"
                            target="_blank"
                            className="text-[#800080] underline"
                        >
                            http://assoc.cse.nitc.ac.in
                        </a>
                    </p>
                    {loading ? (
                        <Loading />
                    ) : (
                        data
                        .sort((a, b) => parseInt(b.Title) - parseInt(a.Title))
                        .map((item) => (
                            <ListComp key={item.id || item.documentId} item={item} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}