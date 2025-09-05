import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, children }) {
  const dialog = useRef(null);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === dialog.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialog}
      className="bg-white rounded-lg shadow-lg md:w-[50%] sm:w-[100%] sm:h-[100%]"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className="flex flex-col text-center">
        <button
          onClick={onClose}
          className="flex justify-end w-full bg-[#800080] px-4 py-2"
        >
          <span className="text-white">X</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}
