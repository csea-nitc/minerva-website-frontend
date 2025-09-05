import ReactMarkdown from "react-markdown";

export default function DistinguisedAlumni({
  picture,
  name,
  program,
  year,
  line1,
  line2,
  url,
}) {
  const markdownLink = url ? `[Profile](${url})` : "";

  return (
    <div className="bg-white border max-w-4xl w-[85%] font-jakarta xs:w-[300px]   border-[#D1D1D1] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] p-2  mx-auto">
    <div className="flex flex-row gap-6 xs:gap-0 xs:flex-col items-center h-full">
      <div
        className="relative max-400:w-[100px] w-[150px]  xs:w-full h-[150px] xs:h-[260px]  rounded-lg overflow-hidden border-2 border-[#800080]"
        style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <img
          src={picture}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
  
  <div className="flex-col flex justify-between">
      <p className="mt-4 text-lg xs:text-xl font-semibold text-gray-900 text-center f">{name}</p>
  
      {url && (
        <div className="mt-3 text-center">
          <ReactMarkdown className="text-accent text-base font-medium">
            {markdownLink}
          </ReactMarkdown>
        </div>
      )}
  
      <div className="mt-2 text-center ">
        <p className="text-gray-700 text-xs font-medium">
          {program} - {year}
        </p>
        <p className="text-gray-600 xs2:max-w-[170px] max-w-[220px] text-xs ">{line1}</p>
        <p className="text-gray-600 max-w-[200px] text-xs mb-2">{line2}</p>
      </div>
    </div>
    </div>
  </div>
  
  );
}
