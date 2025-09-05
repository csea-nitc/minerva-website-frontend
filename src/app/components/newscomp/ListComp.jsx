import React from "react";
import ReactMarkdown from "react-markdown";
import App from "../image-carousel/swiper";
import remarkGfm from "remark-gfm";
import PDF from "../pdf/PDF";

const ListComp = ({ item, flag = 0 }) => {
  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  const swiperImages = item.image
    ? item.image.map((img) => ({
        img: `${backend_url}${img.url}`,
        tag: img.alternativeText || item.Title,
      }))
    : [];

  return (
    <div className="overflow-x-scroll mb-16 p-6 bg-background text-foreground rounded-lg text-center shadow-lg border border-gray-300">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-jakarta font-semibold text-center w-full text-[#800080]">
          {item.Title}
        </h2>
      </div>

      {item.description && (
        <div className="prose prose-sm max-w-none mt-4 font-jakarta text-foreground text-justify break-words">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children }) => (
                <table className="min-w-full table-auto border-collapse mt-4 mb-6 text-lg border border-gray-200">
                  {children}
                </table>
              ),
              th: ({ children }) => (
                <th className="px-4 py-2 text-left border-b font-bold text-gray-700 bg-[#c990c8] text-lg">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-2 border-b text-gray-600 text-lg">{children}</td>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-gray-50">{children}</tr>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#800080] hover:underline text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              p: ({ children }) => (
                <p className="text-lg leading-relaxed mb-4">{children}</p>
              ),
              li: ({ children }) => (
                <li className="text-lg leading-relaxed mb-2 list-disc list-inside">{children}</li>
              ),
            }}
          >
            {item.description}
          </ReactMarkdown>
        </div>
      )}

      {item.image && item.image.length > 0 && (
        <div className="mt-8">
          <App images={swiperImages} flag={false} view={1} width="w-full" />
        </div>
      )}

      {/* Conditionally rendering for dcc page, different schema in backend */}
      {!flag ? (
        item.pdf && item.pdf?.length > 0 && (
          <div className="grid gap-5 mt-4">
            {item.pdf.map((pdf) => (
              <PDF
                key={`${pdf.pdf?.Id}-${pdf.pdf?.documentId}`}
                title={`${pdf.Name}`}
                url={`${backend_url}${pdf.pdf?.url}`}
              />
            ))}
          </div>
        )
      ) : (
        <div className="grid gap-5 mt-4">
          {item.pdf.map((pdf) => (
            <PDF
              key={`${pdf.Id}-${pdf.documentId}`}
              title={`${pdf.name}`}
              url={`${backend_url}${pdf.url}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListComp;
