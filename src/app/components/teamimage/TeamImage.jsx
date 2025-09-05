export default function TeamImage({ member }) {
  return (
    <>
      <div className="mx-auto relative overflow-hidden w-fit rounded-xl group">
        <div>
          <img
            src={member.image}
            alt=""
            className="w-[350px] h-[400px] object-cover group-hover:scale-[1.04] duration-300"
          />
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="px-4 py-2 m-2 bg-white/90 rounded-md flex flex-col items-center">
            <p className="font-semibold font-jakarta text-lg">{member.name}</p>
            {member.role && (
              <p className="font-jakarta text-lg text-gray-500">
                {member.role}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
