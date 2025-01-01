import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Lab.scss";

const Modal = ({ modalData, closeModal }) => {
  useEffect(() => {
    if (modalData) {
      document.body.classList.add("modal-open"); // Disable scroll
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [modalData]);

  if (!modalData) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal} // Close modal on overlay click
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent overlay close on modal click
      >
        <div className="modal-header">
          <h4>{modalData.title}</h4>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img src={modalData.imgUrl} alt={modalData.title} />
          <p>{modalData.description}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-action-btn secondary" onClick={closeModal}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
