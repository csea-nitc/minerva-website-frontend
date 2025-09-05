"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Dropdown from "./Dropdown";
import DropdownMob from "./DropdownMob";
import { gsap } from "gsap";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  const dropdownActivities = [
    { href: "/csea", label: "CSEA" },
    { href: "/essf", label: "ESSF" },
  ];

  const dropdownAcademics = [
    { href: "/programmes", label: "Programmes" },
    { href: "/research", label: "Research" },
    { href: "/laboratories", label: "Laboratory" },
    { href: "/academic-integrity", label: "Academic Integrity" },
  ];

  const dropdownPlacements = [
    { href: "/placements", label: "Placement Statistics" },
    { href: "/internships", label: "Summer Internships" },
  ];

  const dropdownPeople = [
    { href: "/faculty", label: "Faculty" },
    { href: "/staff", label: "Staff" },
    { href: "/adhoc", label: "Adhoc Faculty" },
    { href: "/students", label: "Students" },
    { href: "/alumni", label: "Alumni" },
  ];

  return (
    <div className="absolute w-[100vw] top-0 z-20">
       <div
          className="hamburger z-20 absolute right-8 top-[70px] hidden max-800:flex gap-[6px] flex-col"
          onClick={toggleMenu}
        >
          <div className="h-1 w-8 rounded-md bg-white"></div>
          <div className="h-1 w-8 rounded-md bg-white"></div>
          <div className="h-1 w-8 rounded-md bg-white"></div>
        </div>


      <div style={{ backgroundColor: "#800080" }} className="h-1"></div>
      <div
        ref={navbarRef}
        className="navbar flex bg-gradient-to-b from-black/90 to-transparent font-teko pr-12 pl-6 items-start justify-between h-[180px] pt-5 transition-all duration-10 ease-linear max-920:h-[140px] max-800:items-center"
      >
        <div className="relative z-[200] flex gap-6 logo">
          <img
            className="h-[90px] pl-3 max-1060:h-[80px] max-800:h-[70px]"
            src="/logo.svg"
            alt="Logo"
          />
          <div className="text-white text-2xl space-[20px] pt-1 hidden max-w-[200px] max-800:block">
            National Institute of Technology Calicut
          </div>
        </div>

       

        <div className="flex-col gap-4 max-1060:gap-2 uppercase flex max-800:hidden links">
          <div className="flex justify-end gap-6 h-10 section1 text-white mt-2">
            <Link
              href="/"
              className="text-[26px] px-3 max-1060:text-[22px] max-920:text-[18px]"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/news"
              className="text-[26px] px-3 max-1060:text-[22px] max-920:text-[18px]"
              onClick={closeMenu}
            >
              News
            </Link>
            <Link
              href="/announcements"
              className="text-[26px] px-3 max-1060:text-[22px] max-920:text-[18px]"
              onClick={closeMenu}
            >
              Announcements
            </Link>
            <Link
              href="/contact"
              className="text-[26px] px-3 max-1060:text-[22px] max-920:text-[18px]"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
            <div className="login bg-white text-[26px] h-fit pt-1 flex items-center px-4 rounded-md max-1060:text-[22px] max-920:text-[18px]">
              <Link
                href="https://admin.minerva.nitc.ac.in"
                style={{ color: "#800080" }}
                onClick={closeMenu}
              >
                Login
              </Link>
            </div>
          </div>

          <div className="flex gap-1 uppercase section2 text-white">
            <div className="relative" onClick={() => toggleDropdown(0)}>
              <Link
                href="#"
                className="text-[26px] px-5 max-1060:text-[22px] max-920:text-[18px]"
              >
                Academics
              </Link>
              <Dropdown
                tabs={dropdownAcademics}
                isOpen={activeDropdown === 0}
              />
            </div>
            <div className="h-[30px] max-1060:h-[24px] px-[1px] bg-white mt-1"></div>

            <div className="relative" onClick={() => toggleDropdown(1)}>
              <Link
                href="#"
                className="text-[26px] px-5 max-1060:text-[22px] max-920:text-[18px]"
              >
                Placement and Internships
              </Link>
              <Dropdown
                tabs={dropdownPlacements}
                isOpen={activeDropdown === 1}
              />
            </div>
            <div className="h-[30px] max-1060:h-[24px] px-[1px] bg-white mt-1"></div>

            <div className="relative" onClick={() => toggleDropdown(2)}>
              <Link
                href="#"
                className="text-[26px] px-5 max-1060:text-[22px] max-920:text-[18px]"
              >
                Activities
              </Link>
              <Dropdown
                tabs={dropdownActivities}
                isOpen={activeDropdown === 2}
              />
            </div>
            <div className="h-[30px] max-1060:h-[24px] px-[1px] bg-white mt-1"></div>

            <div className="relative" onClick={() => toggleDropdown(3)}>
              <Link
                href="#"
                className="text-[26px] px-5 max-1060:text-[22px] max-920:text-[18px]"
              >
                People
              </Link>
              <Dropdown tabs={dropdownPeople} isOpen={activeDropdown === 3} />
            </div>
            <div className="h-[30px] max-1060:h-[24px] px-[1px] bg-white mt-1"></div>
            <Link
              href="/awards"
              className="text-[26px] pl-5 max-1060:text-[22px] max-920:text-[18px]"
              onClick={closeMenu}
            >
              Awards
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          className={`transition-all duration-300 ease-in-out z-10 ${
            menuOpen ? "opacity-100" : "max-h-0 py-0 opacity-0 hidden"
          }`}
        >
          

          <div className="relative z-0  dropdown backdrop-blur-[5px]  -mt-[140px] pt-[120px] bg-gradient-to-b from-black/50 to-black/50">
            <div className="flex font-teko flex-col pt-6 p-9 text-[30px] text-white">
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
              <Link href="/news" onClick={closeMenu}>
                News
              </Link>
              <Link href="/announcements" onClick={closeMenu}>
                Announcements
              </Link>
              <Link href="/contact" onClick={closeMenu}>
                Contact Us
              </Link>
              <DropdownMob
                label="People"
                items={dropdownPeople}
                closeMenu={closeMenu}
              />
              <DropdownMob
                label="Activities"
                items={dropdownActivities}
                closeMenu={closeMenu}
              />
              <DropdownMob
                label="Placements and Internships"
                items={dropdownPlacements}
                closeMenu={closeMenu}
              />
              <DropdownMob
                label="Academics"
                items={dropdownAcademics}
                closeMenu={closeMenu}
              />
              <Link href="/awards" onClick={closeMenu}>
                Awards
              </Link>
              <div
                className="bg-white w-[87px] px-4 rounded-lg"
                style={{ color: "#800080" }}
              >
                <Link
                  href="/login"
                  className="login uppercase"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
