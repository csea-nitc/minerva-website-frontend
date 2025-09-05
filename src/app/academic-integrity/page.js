import ImageHero from "../components/imagehero/Imagehero";

export default function AcademicIntegrity() {
    return (
        <>
            <div>
                <ImageHero
                    title="Academic Integrity"
                    font={"80px"}
                    mobileFont={"55px"}
                    contentdiv={".content-div"}
                />
                <div className="w-full mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
                    <div className="bg-[#800080] h-[100%] w-[10px] absolute"></div>
                    <div className="sm:w-[65%] w-[85%] mx-auto py-10">
                        <div className="font-jakarta pt-6 pb-6 md:text-lg text-justify">
                            <strong className="text-[#800080]">
                                Definition of Academic Dishonesty
                            </strong>
                            <p>
                                Definition of Academic Dishonesty Academic
                                dishonesty is defined as any action or practice
                                that provides the potential for an unfair
                                advantage to one individual or one group.
                                Academic dishonesty includes misrepresenting
                                facts, fabricating or doctoring data or result,
                                representing other’s work or knowledge as one’s
                                own, disrupting or destroying the work of
                                others, or abetting anyone who engages in such
                                practices. [1]
                            </p>
                            <br></br>

                            <ol className="list-decimal pt-6 pb-6 list-inside">
                                {" "}
                                <strong className="text-[#800080]">
                                    Examples of Academic Dishonesty{" "}
                                </strong>
                                <li className="pb-2">
                                    Copying during examinations and quizzes.
                                </li>
                                <li className="pb-2">
                                    An attempt to copy, including bringing
                                    unauthorized chits to examination hall,
                                    writing on dress, body or furniture.
                                </li>
                                <li className="pb-2">
                                    Helping another person to copy from ones
                                    answer book or assignment.
                                </li>
                                <li className="">
                                    Doing class assignments for someone else.
                                </li>
                                <li className="pb-2">
                                    Obtaining an unauthorized copy of a test in
                                    advance of its scheduled administration
                                    including unauthorized attempts at breaking
                                    into faculty machines.
                                </li>
                                <li className="pb-2">
                                    Asking for a revaluation after making
                                    changes to the graded answer sheet.
                                </li>
                                <li className="pb-2">
                                    Destroying files or documents of other
                                    students.
                                </li>
                                <li className="pb-2">
                                    Aiding another person in committing an
                                    academically dishonest task.
                                </li>
                            </ol>

                            <strong className="text-[#800080]">
                                Special note on copying code{" "}
                            </strong>
                            <p>
                                It is very difficult to own another person’s
                                code. Therefore, if you are not clearly
                                permitted to use third party code/software, it
                                is highly recommended to write ones own code.
                                Copying, understanding, and editing someone
                                else’s code is a lot more difficult than writing
                                ones own. Unless clearly permitted, you are
                                expected to be writing every single line of your
                                code, and hence you are expected to know every
                                detail of the same. Unable to explain and defend
                                the code submitted by you will be a clear
                                indication of the fact that you do not own it
                                and hence will be treated as a dishonest
                                attempt.
                            </p>
                            <br></br>

                            <strong className="text-[#800080]">
                                Special note on writing reports{" "}
                            </strong>
                            <p>
                                A seminar report or project report is expected
                                to be a documentation of ones own ideas and
                                effort. References, acknowledgements, footnotes
                                and quotation marks are to be used wherever
                                there is a dependence on another document or
                                source. Submitting works published elsewhere,
                                copying documents from the internet, failing to
                                provide references are all considered as
                                dishonest.
                            </p>
                            <br></br>
                            <strong>
                                When in doubt, clarify with the instructor.{" "}
                            </strong>
                            <br></br>
                            <ol className="list-decimal pt-6 pb-6 list-inside">
                                {" "}
                                <strong className="text-[#800080]">
                                    Consequences for Academic Dishonesty{" "}
                                </strong>
                                <li className="pb-2">
                                    If a student is suspected of academic
                                    dishonesty, he/she will be called for a
                                    meeting by the instructor.{" "}
                                </li>
                                <li className="pb-2">
                                    If the instructor concludes that an act of
                                    dishonesty is committed, he/she could decide
                                    on a punishment ranging from zero marks for
                                    that work to a failing grade in the course.
                                </li>
                                <li className="">
                                    Any action taken against a student should be
                                    reported to the class committee for
                                    recording.{" "}
                                </li>
                                <li className="pb-2">
                                    Punishments given for academic dishonesty
                                    will be reflected on the documents issued by
                                    the department including conduct
                                    certificate.
                                </li>
                                <li className="pb-2">
                                    Serious offences and repeated acts of
                                    dishonesty will be reported to the office of
                                    the Dean for institute level disciplinary
                                    measures.
                                </li>
                            </ol>

                            <strong className="text-[#800080]">
                                Reference{" "}
                            </strong>
                            <p>
                                [1]
                                <a
                                    href="https://www.cs.purdue.edu/resources/academic_integrity.html"
                                    class="text-[#800080] hover:underline"
                                >
                                    Academic Integrity - Perdue
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
