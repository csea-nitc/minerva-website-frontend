import ImageHero from "../components/imagehero/Imagehero";
import Link from "next/link";

export default function AboutTheSite() {
    return (
        <>
            <div>
                <ImageHero
                    title="About the Site"
                    font={"60px"}
                    mobileFont={"50px"}
                    contentdiv={".content-div"}
                />
                <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                    <div className="sm:w-[65%] w-[85%] mx-auto">
                        <div className="font-jakarta pt-6 pb-6 md:text-lg">
                            <p>
                                The aim of this website is to publish
                                information about the activities and programs of
                                the Department of Computer Science and
                                Engineering, NIT Calicut on the Internet.
                            </p>
                            <p>
                                We have tried our best to keep the information
                                available on this website as correct, however,
                                we understand there might be some omissions. Our
                                goal is to present this website as a work of
                                quality to the world. We invite contributions
                                from the members of the{" "}
                                <strong>CSED community of NIT Calicut</strong>{" "}
                                to help us achieve this goal. Contributions can
                                be in the form of:
                            </p>
                            <ol className="list-decimal pt-6 pb-6">
                                <li className="pb-2">
                                    <strong>Error reports</strong> - errors may
                                    include spelling mistakes, incorrect
                                    information, improper display of a
                                    particular page or website on your system,
                                    etc among other things. We will try to
                                    correct these as soon as possible.
                                </li>
                                <li className="pb-2">
                                    <strong>Omission reports</strong> - this
                                    includes missing information, lack of detail
                                    on any of the pages among other things. We
                                    will try to make the changes in appropriate
                                    amount of time.
                                </li>
                                <li className="">
                                    <strong>Ideas and Suggestions</strong> for
                                    the improvement of the website are also
                                    welcome.
                                </li>
                            </ol>
                            <p>
                                which can be sent to us by using the{" "}
                                <Link
                                    href="/feedback"
                                    target="_blank"
                                    className="text-[#800080] underline"
                                >
                                    Feedback
                                </Link>{" "}
                                form.
                            </p>
                            <h3>
                                Document on the Website's Design and
                                Implementation Details
                            </h3>
                            <p>
                                We are planning to prepare a report containing
                                the implementation details which will appear on
                                this page when it is ready.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
