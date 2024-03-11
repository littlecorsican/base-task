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
        <div 
            className="fixed p-4 bg-slate-200 shadow-2xl rounded left-[0] top-[0] w-full h-full bg-transparent"            
        >
          <div className="flex flex-col flex-nowrap justify-center align-center mt-[10vh] mx-[10vw] bg-slate-100 px-12">
            <div className="">
                <button className="close-button" onClick={closeModal}>
                Close
                </button>
            </div>
            <div className="py-6">
                {children}
            </div>
          </div>
        </div>
      );
    };
  
    return { isOpen, openModal, closeModal, Modal };
};

export default useModal

