import FeedBack from "../components/feedback/Feedback";
import ImageHero from "../components/imagehero/Imagehero";
export default function FeedbackPage() {
  return (
    <>
      <ImageHero
        title={"Feedback"}
        font={"80px"}
        mobileFont={"20px"}
        contentdiv={".content-div"}
      />
      <div className="py-10 w-[100vw] mt-[40vh] sm:mt-[50vh] md:mt-[60vh] lg:mt-[70vh] relative z-10 bg-white">
        <div className="sm:w-[65%] w-[85%] mx-auto">
          <FeedBack />
        </div>
      </div>
    </>
  );
}
