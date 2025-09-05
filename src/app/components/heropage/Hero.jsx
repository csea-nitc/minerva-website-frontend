"use client";

import React, { useState, useEffect, useRef } from "react";

const Hero = ({ props }) => {
    return (
        <div className="w-[100%] h-[100vh] m-0 p-0 box-border fixed top-0">
            <div
                className="relative container-fluid w-[100%] h-[100%] flex flex-col text-center justify-center items-center bg-cover bg-center pt-5"
                style={{ backgroundImage: "url('/landingaltaltaltalt.jpg')" }}
            >
                <div className="absolute flex flex-col justify-center items-center -translate-y-5">
                    {/* DEPARTMENT OF aligned to the left */}
                    <p className="text-white font-saira lg-xl:text-[2rem] lg:text-[1.8rem] md:text-[1.5rem] sm:text-[1.3rem] text-[1rem]  font-extrabold text-left  w-full leading-tight">
                        DEPARTMENT OF
                    </p>
                    {/* COMPUTER SCIENCE AND ENGINEERING centered */}
                    <p className="text-white font-saira lg-xl:text-[4rem] lg:text-[3rem] md:text-[2.7rem] sm:text-[2.2rem] text-[2.3rem] font-extrabold text-left w-full leading-tight">
                        COMPUTER SCIENCE{" "}
                        
                            <span className="block sm:hidden -m-6 w-[10%] h-[10%] mx-auto ">
                                <br />
                            </span>
                     
                        AND ENGINEERING
                    </p>
                    {/* NATIONAL INSTITUTE OF TECHNOLOGY, CALICUT aligned to the right */}
                    <p className="text-white font-saira lg-xl:text-[2rem] lg:text-[1.8rem] md:text-[1.5rem] sm:text-[1.3rem] text-[1rem]  font-extrabold text-right w-full leading-tight">
                        NATIONAL INSTITUTE OF TECHNOLOGY CALICUT
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
