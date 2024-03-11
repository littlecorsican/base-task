import React, { useState } from 'react';

const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const Modal = ({ children }) => {

      if (!isOpen) return null;

      return (
        <div className="fixed p-4 h-max w-max bg-slate-200 shadow-2xl
        rounded" 
            style={{ minWidth: "350px", minHeight: "550px", left:"40%" }}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
            {children}
          </div>
        </div>
      );
    };
  
    return { isOpen, openModal, closeModal, Modal };
};

export default useModal

