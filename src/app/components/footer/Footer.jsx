import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="px-[3%] py-[1%]  bg-[#800080]  font-jakarta text-white z-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-end md:gap-6 border-b border-b-white px-[5%]">
                    <div className="flex flex-col gap-16">
                        <div className="px-2 md:px-4 flex items-center gap-6 translate-x-2 md:-translate-x-8 md:translate-y-4">
                            <img
                                className="h-[96px] w-[81px]"
                                src="/nitc-logo.png"
                                alt=""
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-bold text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.1vw]">
                                    Department of Computer <br />
                                    Science and Engineering
                                </p>
                                <span className="text-lg font-jakarta">
                                    National Intitute of Technology Calicut
                                </span>
                            </div>
                        </div>
                        <img
                            className="w-[800px] hidden md:block"
                            src="/footer.svg"
                            alt=""
                        />
                    </div>


                    <div className="md:max-w-[400px] flex-grow mb-4 md:translate-x-0 font-bold -translate-x-14 md:mt-0 mt-10 mb-10">
                        <div className="flex flex-col text-nowrap text-[1rem] sm:text-[0.8rem] xl:text-[0.85rem] ">
                            {/* <p className="px-2 py-4 border-b border-white"></p> */}
                            <Link
                                className="px-2 py-4 border-b border-white"
                                href="/terms"
                            >
                                Terms of Use
                            </Link>
                            <Link
                                className="px-2 py-4 border-b border-white"
                                href="/accessibility"
                            >
                                Accessibility Statement
                            </Link>
                            <Link
                                className="px-2 py-4 border-b border-white"
                                href="/about-site"
                            >
                                About the Site
                            </Link>
                            <Link
                                className="px-2 py-4 border-b border-white"
                                href="/feedback"
                            >
                                Feedback
                            </Link>
                            <Link className="px-2 pt-4" href="/credits">
                                Credits
                            </Link>
                        </div>
                    </div>
                    <img
                        className="w-[1000px] block md:hidden"
                        src="/footer.svg"
                        alt=""
                    />
                </div>
                <div className="pt-1 flex justify-between tracking-wide text-[.5vw]">
                    <div className="flex flex-col gap-2">
                        <p className="md:text-[14px] text-[8px] font-jakarta ">Copyright © 2024-2025 CSED, NIT Calicut</p>
                        <p className="md:text-[14px] text-[8px] font-jakarta ">All Rights Reserved</p>
                    </div>
                    <div>
                        <a href = "https://assoc.cse.nitc.ac.in/" className="md:text-[14px] text-[12px] font-jakarta ">Created by the CSEA and CSED</a>
                    </div>
                </div>
            </footer>
        </>
    );

}
