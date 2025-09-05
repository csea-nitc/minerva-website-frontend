import Link from "next/link";
import ImageHero from "../components/imagehero/Imagehero";

export default function page() {
  return (
    <>
      <ImageHero
        title={"Credits"}
        font={"80px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
      />
      <div className="px-[13%] md:px-[17%] font-jakarta text-lg w-[100vw] mt-[40vh] sm:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="py-4">
          <h2 className="font-semibold text-2xl text-accent">Project Leads</h2>
          <ul className="flex flex-col ">
            <Link href={"https://www.linkedin.com/in/arunnats/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Arun Natarajan
              </span>{" "}
              - B.Tech CSE 2026
            </Link>
            <Link href={"https://www.linkedin.com/in/hafeez-m/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Hafeez Muhammed
              </span>{" "}
              - B.Tech CSE 2026
            </Link>
            <Link href={"https://www.linkedin.com/in/aditya-kamble27/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Adithya
              </span>{" "}
              - B.Tech CSE 2026
            </Link>
          </ul>
        </div>
        <div className="py-4">
          <h2 className="font-semibold text-2xl text-accent">Developers</h2>
          <ul className="flex flex-col ">
            <Link href={"https://www.linkedin.com/in/nadeem-m-siyam/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Nadeem M Siyam
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/devadath-kartha-387002288/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Devadath A Kartha
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/rohith-s-cs?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_api"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Rohith S Nair
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/richie-james-b65101220/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Richie James
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/munukuntla-rithvik-reddy/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                M Rithvik Reddy
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
          </ul>
        </div>
        <div className="py-4">
          <h2 className="font-semibold text-2xl text-accent">
            Design and Implementation
          </h2>
          <ul className="flex flex-col ">
            <Link href={"https://www.linkedin.com/in/tarun-nambiar-003b11285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Tarun Pradeep
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/visruth-mohandas-b49968333/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Visruth Mohandas
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
            <Link href={"https://www.linkedin.com/in/neha-suresh-196538286/"}>
              <span className="underline underline-offset-2 text-[#800080]">
                Neha Suresh
              </span>{" "}
              - B.Tech CSE 2027
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
