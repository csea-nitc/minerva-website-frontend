export default function YearCard({ year, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="outline-none bg-[#C891C8] border-2 border-[#800080] font-jakarta font-semibold text-xl w-[300px] text-center p-5 rounded-lg"
      >
        {year}
      </button>
    </>
  );
}
