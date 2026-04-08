import React, { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <h2>Simple Modal</h2>
        <p>This is a clean cheap modal.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;