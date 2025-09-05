import ImageHero from "../components/imagehero/Imagehero";
export default function accessibility() {
    return (
        <div>
            <ImageHero
                title={"Accessibility Statement"}
                font={"80px"}
                mobileFont={"20px"}
                contentdiv={".content-div"}
            />
            <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                <div className="sm:w-[65%] w-[85%] mx-auto">
                    <div className="font-jakarta pt-6 pb-6">
                        <p className="md:text-lg">
                            We are trying to ensure that the CSED Website is
                            accessible to all users irrespective of device in
                            use, technology or ability. It is being built with
                            an aim to provide maximum{" "}
                            <span className="font-bold">
                                accessibility and usability
                            </span>{" "}
                            to its visitors. As a result, this website will be
                            viewable from a variety of devices, such as
                            web-enabled mobile devices, wap phones, PDAs, and so
                            on.
                        </p>
                        <p className="md:text-lg pt-6">
                            We are putting in our best efforts to ensure that
                            all information on this website is accessible to
                            people with disabilities.&nbsp;For example, a user
                            with visual disability will be able to access this
                            website using assistive technologies, such as screen
                            readers and magnifiers.
                        </p>
                        <p className="md:text-lg pt-6">
                            We also aim to be standards compliant and follow
                            principles of usability and universal design, which
                            should help all visitors of this website.
                        </p>
                        <p className="md:text-lg pt-6">
                            If you have any problem or suggestion regarding the
                            accessibility of this website, please{" "}
                            <a
                                href="/feedback"
                                target="_blank"
                                className="text-[#800080] underline"
                            >
                                Tell Us
                            </a>{" "}
                            to enable us to respond in a helpful manner.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
