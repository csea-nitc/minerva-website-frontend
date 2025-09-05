import Modal from "../modal/Modal";
import React, { useState } from "react";

export default function FacultyCard({ faculty }) {
  const [showModal, setShowModal] = useState(false);
  const backend_url = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <div
        className="mx-auto relative overflow-hidden w-[250px] h-[300px] rounded-xl group"
        onClick={() => setShowModal(true)}
      >
        <div>
          <img
            src={`${backend_url}/${faculty?.photograph?.url}`}
            alt={faculty.name}
            className="w-[350px] h-[400px] object-cover group-hover:scale-[1.04] duration-300"
          />
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="px-4 py-2 m-2 bg-white/90 rounded-md flex flex-col items-center">
            <p className="font-semibold font-jakarta text-lg">{faculty.name}</p>
            <p className="font-jakarta text-lg text-gray-500">
              {faculty.designation}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <ul className="text-[0.7rem] md:text-[0.85rem] lg:text-[0.95rem] p-0">
                {faculty.contact_email && (
                  <li className="m-4">
                    Email: {faculty.contact_email}
                  </li>
                )}
                {faculty.office_location && (
                  <li className="m-4">
                    Office Location:{" "}
                    {faculty.office_location}
                  </li>
                )}
                {faculty.contact_no && (
                  <li className="m-4">
                    Office Contact: {faculty.contact_no}
                  </li>
                )}
                {faculty.education && (
                  <li className="m-4">
                    Education: {faculty.education}
                  </li>
                )}
                {faculty.specialisation && (
                  <li className="m-4">
                    Specialisation:{" "}
                    {faculty.specialisation}
                  </li>
                )}
                {faculty.associated_frgs && (
                  <li className="m-4">
                    Associated FRGs:{" "}
                    {faculty.associated_frgs}
                  </li>
                )}
                {faculty.external_links && (
                  <li className="m-4">
                    External Links:{" "}
                    {faculty.external_links}
                  </li>
                )}

                {faculty.additional_info && (
                  <li className="m-4">
                    Additional Info:{" "}
                    {faculty.additional_info}
                  </li>
                )}

                {/* Adding additional feilds for PhD scholors */}
                
                {faculty.year_of_admission && (
                  <li className="m-4">
                    Year of Admission:{" "}
                    {faculty.year_of_admission}
                  </li>
                )}

                {faculty.areas_of_interest && (
                  <li className="m-4">
                    Areas of Interest:{" "}
                    {faculty.areas_of_interest}
                  </li>
                )}
              </ul>
        </Modal>
      )}
    </>
  );
}
