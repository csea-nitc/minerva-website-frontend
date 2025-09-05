import ImageHero from "../components/imagehero/Imagehero";

export default function TermsPage() {
    return (
        <>
            <ImageHero
                title={"Terms of Use"}
                font={"80px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
            />
            <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="sm:w-[65%] w-[85%] mx-auto">
                    <div className="font-jakarta pt-6 pb-6">
                        <p className="md:text-lg ">
                            The CSED, NIT Calicut web site is created and
                            maintained by the department to disseminate
                            information about the activities and programs of the
                            department to individuals and the educational and
                            research communities over the Internet. Access to
                            and use of the web site are subject to the terms and
                            conditions set forth herein and all applicable laws.
                            These terms and conditions may be revised or updated
                            by CSED, NIT Calicut.
                        </p>
                        <ol className="list-decimal pt-6 md:text-lg">
                            <li className="pb-2">
                                <span className="font-bold">Use:</span> The
                                purpose of this website is to provide
                                information and services related to department's
                                programs and services. All content provided is
                                solely for personal, institutional, or other
                                non-commercial use.
                            </li>
                            <li className="pb-2">
                                <span className="font-bold">Trademarks:</span>{" "}
                                Use of NIT Calicut logo or any insignia is not
                                permitted without express written consent from
                                NIT Calicut.
                            </li>
                            <li className="pb-2">
                                <span className="font-bold">
                                    Linking to CSED, NIT Calicut website:
                                </span>{" "}
                                Permission is hereby granted to third parties to
                                link directly to the CSED, NIT Calicut website,
                                provided the following conditions are met
                                <ul className="list-disc pl-12">
                                    <li>
                                        Links shall be from sites related to the
                                        content and purpose of the CSED, NIT
                                        Calicut website, and shall be for the
                                        purpose of promoting said content to, or
                                        providing direct access for CSED, NIT
                                        Calicut constituencies.
                                    </li>
                                    <li>
                                        Websites desiring to include a copy of
                                        the NIT Calicut logo, or any logo
                                        representing CSED, NIT Calicut programs
                                        or services, with their link should
                                        contact the webmaster CSED, NIT Calicut
                                        website for relevant permissions,
                                        necessary copyright information and
                                        copies of appropriate graphics.
                                    </li>
                                </ul>
                            </li>
                            <li className="pb-2">
                                CSED, NIT Calicut reserves the right to withdraw
                                the permissions given herein upon determination
                                that any or all of the above-stated conditions
                                have not been met, or that additional
                                circumstances lead CSED, NIT Calicut to
                                conclude, in its sole discretion, that a given
                                link is not in accordance with the business,
                                educational purposes, or best interests of CSED,
                                NIT Calicut.
                            </li>
                            <li className="pb-2">
                                <span className="font-bold">
                                    Links from CSED, NIT Calicut website:
                                </span>{" "}
                                CSED, NIT Calicut provides links to other
                                websites for informational purposes only. CSED,
                                NIT Calicut is not responsible for the content
                                in other sites, and links from the CSED, NIT
                                Calicut website to other sites are not intended
                                to imply endorsement of them by CSED, NIT
                                Calicut.
                            </li>
                            <li className="pb-2">
                                <span className="font-bold">
                                    Privacy Statement:
                                </span>{" "}
                                CSED, NIT Calicut respects your right to
                                privacy. When you visit the CSED, NIT Calicut
                                website, the following information may be
                                collected from you, either voluntarily or
                                involuntarily : your computer or network's IP
                                address, which must be validated in order for
                                you to access the CSED, NIT Calicut website;
                                your e-mail address and message when you
                                communicate electronically with us; information
                                about your visit is gathered in an aggregate
                                manner for quality control, security and
                                improvement of our site. Your information is
                                kept confidential, unaltered, and used only by
                                the CSED, NIT Calicut to administer your
                                request. The CSED, NIT Calicut does not disclose
                                or sell any personally identifiable information
                                collected at this site to other companies or
                                organizations.
                            </li>
                        </ol>
                        <p>
                            (Adapted from{" "}
                            <a
                                href="https://www.iitm.ac.in"
                                target="_blank"
                                className="text-[#800080] underline"
                            >
                                IITM website terms)
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
