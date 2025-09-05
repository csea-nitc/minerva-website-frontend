export default function Profile() {
  return (
    <>
      <div className=" relative md:h-[50rem] md:flex m-0 p-0 overflow-hidden flex overflow-y-hidden overflow-x-hidden">
        <div className="flex flex-col md:flex-row h-[100%] w-[100%] ">
          <div className="flex justify-center items-center">
            <div className="text-center md:transform md:rotate-90 font-saira  text-[#800080] lg:text-[11.5rem] xl-lg:text-[12rem] md:text-[10rem] sm:text-[8rem] text-[5rem] md:absolute  md:w-[52rem] sm:h-[10.75rem] flex justify-center items-center md:top-[43%] lg:right-[-17rem] md:right-[-20.5rem] right-[-28rem] font-bold ">
              PROFILE
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="sm:h-[100%] h-[50%] font-jakarta font-bold text-black xl:text-[1.7rem] md:text-[1.5rem] sm:text-[1.3rem] text-[1.1rem] xl:w-[60%] lg:w-[65%] md:w-[68%] sm:w-[80%] w-[85%]  flex flex-col md:justify-center justify-start text-justify sm:gap-[5rem] gap-[1rem] md:mr-[5rem] lg:mr-[9rem] lg-xl:mr-[10rem] xl:mr-[15rem]  ">
              <p className="mb-8 md:block hidden">
                Department of Computer Science and Engineering offers
                undergraduate and postgraduate programs in computer science and
                engineering and doctoral degree program.
              </p>
              <p className="md:block hidden">
                The fast changing scenario in Information Technology
                necessitates the department to actively extend its research and
                development activities. The{" "}
                <span className="text-[#800080]">
                  current research interests of the department
                </span>{" "}
                include major areas of research in computer science.
              </p>
            </div>
          </div>
          <div className="text-black font-jakarta w-[89%] font-bold text-justify md:mr-[2rem] lg:mr-[0rem] flex flex-col justify-center items-center xl:text-[1.7rem] md:text-[1.5rem] sm:text-[1.3rem] text-[1.1rem] md:ml-[3rem] sm:ml-[3rem] ml-[1.6rem] md:hidden">
            <p className="w-[90%] pb-10">
              Department of Computer Science and Engineering offers
              undergraduate and postgraduate programs in computer science and
              engineering and doctoral degree program.
            </p>
            <p className="w-[90%] pb-10">
              The fast changing scenario in Information Technology necessitates
              the department to actively extend its research and development
              activities. The{" "}
              <span className="text-[#800080]">
                current research interests of the department
              </span>{" "}
              include major areas of research in computer science.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
