"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../loading/loading";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const token = process.env.NEXT_PUBLIC_TOKEN;
const backend_url = process.env.NEXT_PUBLIC_API_URL;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [link, setLinks] = useState([]);
  const [dept_brochure, Setdept] = useState([]);
  const [phd_brochure, Setphd] = useState([]);
  const buttonRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    // Fetch data for links
    const fetchData = async () => {
      try {
        const linksD = await fetch(
          `${backend_url}/api/quick-links?sort[0]=createdAt:desc&populate[pdf][populate]=*&populate=image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const linksData = await linksD.json();
        setLinks(linksData.data ? linksData.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    const fetchBrochures = async () => {
      try {
        const [deptBrochureRes, phdBrochureRes] = await Promise.all([
          fetch(`${backend_url}/api/deparment-brochure?populate=pdf`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${backend_url}/api/ph-d-brochure?populate=pdf`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [deptBrochureData, phdBrochureData] = await Promise.all([
          deptBrochureRes.json(),
          phdBrochureRes.json(),
        ]);

        Setdept(deptBrochureData.data || []);
        Setphd(phdBrochureData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData( );
    fetchBrochures( ) ; 
  }, []);



  useEffect(() => {
    // GSAP animation for the button
    gsap.fromTo(
      buttonRef.current,
      { x: "100%" }, // Start off-screen
      {
        x: "0%", // Move into view
        scrollTrigger: {
          trigger: document.body,
          start: "top 90% ",
          end: "top 85%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    const sidebar = sidebarRef.current;

    if (!isOpen) {
      // Enable ScrollTrigger animation when sidebar is closed
      gsap.fromTo(
        button,
        { x: "100%" }, // Start off-screen
        {
          x: "0%", // Move into view
          scrollTrigger: {
            trigger: document.body,
            start: "top 90% ",
            end: "top 85%",
            scrub: true,
          },
        }
      );
    } else {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (!isMobile && !isTablet) {
        gsap.set(button, { x: "-23.5rem" });
      } else if (isTablet){
        gsap.set(button, { x: "-320px" });
      } else {
        gsap.set(button, { x: "-100vw" });
      }
    }

    return () => {
      // Clean up all ScrollTrigger instances on component unmount or state change
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className={`fixed top-[7rem] right-0 transition-transform duration-300 ease-in-out  bg-white text-white p-4 z-50 rounded-tl-xl border-r-0 rounded-bl-xl border-[#800080] border-2`}
      >
        <div className="transition-transform duration-300 ease-in-out">
          <Image
            src={
              isOpen
                ? "/images/sidebar-icon-closed.svg"
                : "/images/sidebar-icon.svg"
            }
            alt="Sidebar Logo"
            width={40}
            height={40}
          />
        </div>
      </button>

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-[100vw] sm:w-[20rem] lg:w-[23.5rem] h-full bg-white overflow-y-auto overflow-x-hidden text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40 flex flex-col items-center justify-start`}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={toggleSidebar}
            className={`sm:hidden bg-white text-white transition-all transform pr-1 pt-1 z-50 duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="transition-transform duration-300 ease-in-out">
              <Image
                src="/images/sidebar-icon-closed-filled.svg"
                alt="Sidebar Logo"
                width={50}
                height={50}
              />
            </div>
          </button>
        </div>
        <div className="flex items-center relative justify-center">
          <div className="h-[0.25rem] w-[18%] bg-[#800080] absolute left-[-2.55rem]"></div>
          <h2 className="sm:text-[2rem] text-[2rem] text-black font-verdana font-bold p-3 w-[100%] text-center">
            QUICK LINKS
          </h2>
          <div className="h-[0.25rem] w-[18%] bg-[#800080] absolute right-[-2.55rem]"></div>
        </div>
        <ul className="font-verdana flex flex-col justify-center items-center flex-grow lg:text-[1.5rem] sm:text-[1.3rem] text-[1.2rem] w-[90%] overflow-y-scroll scrollbar-none">
          <li className="m-4 text-black border-white border-2 text-center rounded-s">
            <Link href="/">Home</Link>
          </li>
          <li className="h-[0.1rem] w-[80%] bg-[#800080]"></li>
          <ul>
            {link && link.length > 0 ? (
              link.map((item) => (
                <li
                  key={item.id}
                  className="m-4 text-black border-white border-2 text-center rounded-s"
                >
                  <Link href={`/node/${item.documentId}`}>{item.Title}</Link>
                </li>
              ))
            ) : (
              <Loading />
            )}
          </ul>
          <li className="h-[0.1rem] w-[80%] bg-[#800080]"></li>
          <ul>
            <li className="m-4 text-black border-white border-2 text-center rounded-s">
              <a href="/dcc">DCC Minutes</a>
            </li>
            <li className="m-4 text-black border-white border-2 text-center rounded-s">
              <a href="/downloads">Downloads</a>
            </li>
          </ul>
          <li className="h-[0.1rem] w-[80%] bg-[#800080]"></li>
          
          { dept_brochure && phd_brochure ? (
            <ul>
              <li
                className="m-4 text-black border-white border-2 text-center rounded-s"
              >
                <Link href={`${backend_url}${dept_brochure.pdf?.url}`}>Department Brochure</Link>
              </li>
            </ul>
          ) : (
            <Loading />
          )}
        </ul>
        <button className="sm:text-[2rem] text-[2rem] text-black font-verdana font-bold bg-[#e3c7e3] w-[100%] text-center p-3">
          <Link href="https://admin.minerva.nitc.ac.in">Login</Link>
        </button>
      </div>
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
