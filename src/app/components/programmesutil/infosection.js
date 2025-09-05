import { ListStart } from "lucide-react";
import DropdownButtons from "../dropdownbuttons/Dropdownbuttons";
import ListComp from "../newscomp/ListComp";
import { useState , useEffect} from "react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";

const backend_url = process.env.NEXT_PUBLIC_API_URL ; 
const token  = process.env.NEXT_PUBLIC_TOKEN ; 

const headingSizes = {
  1: "text-5xl sm:text-5xl md:text-6xl",
  2: "text-4xl sm:text-4xl md:text-5xl",
  3: "text-3xl sm:text-3xl md:text-4xl",
  4: "text-2xl sm:text-2xl md:text-3xl",
};


const renderNode = (node, key) => {
  if (!node) return null;

  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="font-jakarta sm:text-2xl md:text-[1.2rem] my-2">
          {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
        </p>
      );

    case 'heading':
        const Tag = `h${node.level || 2}`;
        const sizeClass = headingSizes[node.level] || headingSizes[2]; // default to level 2 if undefined
        return (
            <Tag key={key} className={`text-accent font-jakarta font-bold flex justify-left items-center ${sizeClass}`}>
            {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
            </Tag>
        );

    case 'list':
      if (node.format === 'unordered') {
        return (
          <ul key={key} className="list-disc ml-8 font-jakarta sm:text-lg md:text-xl">
            {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
          </ul>
        );
      } else if (node.format === 'ordered') {
        return (
          <ol key={key} className="list-decimal ml-8 font-jakarta sm:text-lg md:text-xl">
            {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
          </ol>
        );
      }
      return null;

    case 'list-item':
      return (
        <li key={key} className="my-2">
          {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
        </li>
      );

    case 'text':
      // Handle marks like bold, italic, underline etc.
      let text = node.text;

      if (node.bold) text = <b key={key} className="text-accent">{text}</b>;
      else if (node.italic) text = <em key={key}>{text}</em>;
      else if (node.underline) text = <u key={key}>{text}</u>;
      else text = <span key={key}>{text}</span>;

      return text;

    case 'link':
      return (
        <a
          key={key}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          {node.children && node.children.map((child, i) => renderNode(child, `${key}-${i}`))}
        </a>
      );

    default:
      // For any unknown type, try to render children
      if (node.children) {
        return node.children.map((child, i) => renderNode(child, `${key}-${i}`));
      }
      return null;
  }
};


export default function InfoSection({
    title,
    para1,
    para2,
    img1,
    img2
}) {
    const [data , setData]  = useState( [] ); 
    const [brochure, setBrochure] = useState(null);
    
    let name ; 

    useEffect(() => {
        if (title === "B.Tech") name = "b-teches";
        if (title === "M.Tech-CSE") name = "m-teches";
        if (title === "M.Tech-CSE (IS)") name = "m-tech-is";
        if (title === "M.Tech-CSE (AIDA)") name = "m-tech-aidas";
        

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${backend_url}/api/programme-${name}?populate[pdf][populate]=*`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                const jsonData = await response.json();
                let fetchedData = jsonData.data ? jsonData.data : [];
    
                const brochureEntry = fetchedData.find(item => item.Title === "Brochure");

                const desiredOrder = ["Curriculum", "Syllabi", "Ordinances and Regulations", "Outcomes"];
                
                // Sort fetched data based on desired order

                /*
                    sorting array based on entry names in backend to get desired response order , to get rid of created_at sort 
                */
               
                let sortedData = desiredOrder.map((title) =>
                    fetchedData.find((item) => item.Title === title)
                ).filter(Boolean);
    
                setData(sortedData);
                setBrochure(brochureEntry);  
            } catch (err) {
                console.error("Fetch error:", err);
                setData([]); 
                setBrochure(null);
            }
        };
    
        if (title !== "PhD") fetchData();
    }, [title]);

    return (
        <div className="flex flex-col max-1240:pr-[2vw] mb-[10vh] ">
            
            {/* Phd tab does not need this navigation */}
            {  title !== "PhD" &&  ( <DropdownButtons data = { data }  />) }
        
            {/* Brochure section */}
            {title !== "PhD" && brochure && (
                <div className="brochure-section flex flex-col sm:w-[50%] sm:mx-0 w-[90%] mx-auto">
                    {brochure.pdf?.map((pdfItem, idx) => (
                    <a
                        key={idx}
                        href={`${backend_url}/${pdfItem.pdf.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-jakarta px-4 sm:px-2 py-2 mt-6 font-bold text-[1.2em] md:text-[1.5em] rounded-lg bg-[#800080] text-white text-center hover:bg-white hover:text-[#800080] transition-colors duration-200 border-2 border-[#800080] shadow-sm"
                        >
                        Brochure 
                        
                        </a>
                        
                    ))}
                </div>
            )}


            {/* about section */}
             
            <div className=" font-jakarta text-[1.2em] leading-[35px] max-800:leading-7">
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-justify ">
                    <div className="w-[90%] flex  order-1 sm:order-2 mx-auto sm:justify-self-end sm:mx-0">
                        <img
                            src={img1}
                            className="object-cover h-[300px] shadow-[-20px_20px_0px_#CF92CE]  "
                        />
                    </div>
                    <div className="w-full  pr-5 pl-2 sm:px-0 sm:pr-4 sm:pl-0  font-jakarta order-2 mt-4 sm:order-none sm:my-auto">
                        {para1.map((block, i) => renderNode(block, i))}
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-justify">
                    <div className="w-[90%] mx-auto">
                        <img
                            src={img2}
                            className="object-cover h-[300px]  shadow-[-20px_20px_0px_#CF92CE]"
                        />
                    </div>
                    <div className="w-full mt-6 sm:my-auto  font-jakarta pl-2 pr-5 ">
                        {para2.map((block, i) => renderNode(block, i))}
                    </div>
                </div>
            </div>

        </div>
    );
}
